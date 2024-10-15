//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CryptoNautsCoin is ERC20 {
    // Dono do contrato
    address private immutable owner;

    constructor() ERC20("CryptoNautsCoin", "CNC") {
        owner = msg.sender;
        _mint(msg.sender, 10000000 * 10e18);
        
    }

    function mint(address _to, uint256 _amount) public onlyOwner {
     _mint(_to, _amount);   
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner of the contract can execute.");
        _;
    }
    
}