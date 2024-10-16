//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./CryptoNautsCoin.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import { UD60x18, ud } from "@prb/math/src/UD60x18.sol";
import { SD59x18, sd } from "@prb/math/src/SD59x18.sol";

contract CryptoNautsSale {

    address payable private immutable owner;
    CryptoNautsCoin private token;
    uint256 private tokensSold;
    uint256 private tokenPriceUSD;
    AggregatorV3Interface internal priceFeed;

    uint256 private transactionCount;

    event Sell(address _buyer, uint256 _amount);

    struct Transaction {
        address buyer;
        uint256 amount;
    }

    mapping (uint256 => Transaction) public transaction;

    fallback() external payable { }
    receive() external payable { }

    constructor(CryptoNautsCoin _token, address _priceFeed) {
        
        priceFeed = AggregatorV3Interface(_priceFeed);
        tokenPriceUSD = 500; // 5.00 USD = 5 USD
        token = _token;
        owner = payable(msg.sender);

    }

    function getTransactionCount() external view returns(uint256) {
        return transactionCount;
    }

    function getTokensSold() external view returns(uint256) {
        return tokensSold;
    }

    function getTokenPrice() external view returns(uint256) {
        return tokenPriceUSD;
    }

    function getETHPrice() public view returns(int) {
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return (price/1e6);
    }

    function calculateTokenPrice(uint256 _numberOfTokens) public view returns (UD60x18) {
        // Fetch the latest ETH price in USD
        (, int256 ethPrice, , ,) = priceFeed.latestRoundData();
        require(ethPrice > 0, "Invalid price data");

        // Calcula o Ether necessário usando PRBMath para aritmética de ponto fixo
        UD60x18 ethPriceInUSD = ud(uint256(ethPrice/1e6));
        UD60x18 totalCostInUSD = ud(tokenPriceUSD*_numberOfTokens); // Total cost in USD
        UD60x18 requiredEther = (totalCostInUSD) / ethPriceInUSD; // Convert to Ether

        return requiredEther;
    }

    function buyToken(uint256 _amount) public payable {
        
        UD60x18 _calculateTokenPrice = calculateTokenPrice(_amount);
        UD60x18 msgValue = ud(uint(msg.value));

        // Verifica se o comprador envia ETH suficiente
        require(_amount > 0, "Does not accept 0 or smaller numbers in amount");
        require(msg.value > 0, "Send ETH to buy some tokens");
        require(msgValue >= _calculateTokenPrice, "There is not enough ether to buy tokens");

        // check that the sale contract provides the enough ETH to make this transaction
        require(token.balanceOf(address(this)) >= _amount, "Insufficient tokens in contract");
        
        // Faz a transação dentro do require
        // transferência retorna um valor booleano.
        require(token.transfer(msg.sender, _amount));

        // Increase the amount of tokens sold
        tokensSold += _amount;
        // Increase the amount of transactions
        transaction[transactionCount] = Transaction(msg.sender, _amount);
        transactionCount++;
        emit Sell(msg.sender, _amount);

    }

    function endSale() public onlyOwner {
        // Devolver os tokens que ficaram dentro do contrato de venda
        uint256 amount = token.balanceOf(address(this));
        require(token.transfer(owner, amount));

    }

    // Função de retirada para o proprietário retirar o Ether do contrato
    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner of the contract can execute.");
        _;
    }
    
}