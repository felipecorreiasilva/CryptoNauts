//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./CryptoNautsCoin.sol";
import "./CryptoNautsSale.sol";

contract CryptoNauts {
    
    // Dono do contrato
    address payable private immutable owner;
    CryptoNautsCoin private token;
    uint256 private priceRegister;
    // Array para armazenar todos Ids dos navegantes
    uint256[] private nautsIds;
    

    struct Nauts {
        string email;
        string name;
        string role;
    }

    mapping (uint256 => Nauts) private _nauts;

    // *** Eventos ***
    // Atualizar informações de navegantes
    event NautsInfo(uint256 id, string name, string role);
    // Navegante Deletado
    event NautsDeleted(uint256 id);

    constructor(CryptoNautsCoin _token){
        owner = payable(msg.sender);
        token = _token;
        priceRegister = 5000;
        _nauts[0].email = "felipecorreiasilva@outlook.com";
        _nauts[0].name = "Felipe Correia Silva";
        _nauts[0].role = "Piloto";
        nautsIds.push(0);
        
    }
    

    function nautsExistsByEmail(string calldata _email) public view returns(bool){
        bool _nautsExists = false;

        require(bytes(_email).length >= 3, "Email precisa conter pelo menos 3 digitos");

        for (uint256 i = 0; i < nautsIds.length; i++) {
            bool emailExists = (keccak256(abi.encodePacked(_email)) == keccak256(abi.encodePacked(_nauts[i].email)));
            
            if (emailExists) {
                _nautsExists = true;
            }
        }

        
        return _nautsExists;
        
    }

    // Registrar Navegantes
    function createNauts(string calldata _email, string calldata _name, string calldata _role) public returns(bool) {
        bool _nautsExists = nautsExistsByEmail(_email);

        require(_nautsExists == bool(false),"Navegante existente");
        require(bytes(_name).length >= 3, "Nome precisa conter pelo menos 3 digitos");
        require(bytes(_role).length >= 3, "Papel precisa conter pelo menos 3 digitos"); 
        
        // check that the sale contract provides the enough tokens to make this transaction
        require(token.balanceOf(msg.sender) >= priceRegister, "Tokens insuficientes");

        // Adicionado novo id de navegante em nautsIds
        nautsIds.push(uint256(nautsIds.length));
        _nauts[uint256(nautsIds.length)-1] = Nauts(_email, _name, _role);
        emit NautsInfo(uint256(nautsIds.length)-1, _name, _role);
        return true;


    }
    

    // Atualizar Navegantes
    function updateNauts(uint256 id, string calldata _newEmail, string calldata _newName, string calldata _newRole) external onlyOwner {
        
        bool _nautsExists = nautsExistsByEmail(_newEmail);

        require(bytes(_newName).length >= 3, "Nome precisa conter pelo menos 3 digitos");
        require(bytes(_newRole).length >= 3, "Papel precisa conter pelo menos 3 digitos");
        
        require(_nautsExists == bool(false),"Navegante existente");
        // Adicionado novo id de navegante em nautsIds
        _nauts[id] = Nauts(_newEmail, _newName, _newRole);
        emit NautsInfo(id, _newName, _newRole);
        
    }

    // Pegar quantidade de navegantes registrados
    function getNautsCount() external view returns (uint256) {
        
        return nautsIds.length;
    }

    // Pega preço do registro
    function getPriceRegister() external view returns (uint256) {

        return (priceRegister);

    }

    // Pega navegante por id
    function getNauts(uint256 id) external view returns (string memory, string memory) {
        require(bytes(_nauts[id].name).length > 0, "Navegante inexistente");
        Nauts storage nauts = _nauts[id];
        return (nauts.name, nauts.role);
    }

    // Pegar lista de navegantes
    function getAllNauts() external view returns (Nauts[] memory) {
        Nauts[] memory allItems = new Nauts[](nautsIds.length);
        for (uint256 i = 0; i < nautsIds.length; i++) {
            allItems[i] = _nauts[nautsIds[i]];
        }
        return allItems;
    }

    // Deletar navegante
    function deleteNauts(uint256 id) external onlyOwner {
        require(bytes(_nauts[id].name).length > 0, "Navegante inexistente");
        delete _nauts[id];

        //Remove o ID do array nautsIds
        for (uint256 i = 0; i < nautsIds.length; i++) {
            if (nautsIds[i] == id) {
                nautsIds[i] = nautsIds[nautsIds.length - 1]; // Substitua pelo último item
                nautsIds.pop(); // Remove ultimo item array
                break;
            }
        }

        emit NautsDeleted(id);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Somente o dono do contrato pode executar.");
        _;
    }

}