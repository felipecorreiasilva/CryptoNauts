//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract CryptoNauts {
    
    // Dono do contrato
    address private immutable owner;
    // Array para armazenar todos Ids dos navegantes
    uint256[] private nautsIds;
    

    struct Nauts {
        uint256 id;
        string name;
        string role;
    }

    mapping (uint256 => Nauts) private _nauts;

    // *** Eventos ***
    // Atualizar informações de navegantes
    event NautsInfo(uint256 id, string name, string role);
    // Navegante Deletado
    event NautsDeleted(uint256 id);

    constructor(){
        owner = msg.sender;
        _nauts[0].name = "Felipe Correia Silva";
        _nauts[0].role = "Desenvolvedor Full Stack";
        nautsIds.push(0);
        
    }
    

    function nautsExistsByName(string calldata name) public view returns(bool){
        bool _nautsExists = false;

        require(bytes(name).length == 3, "Nome precisa conter pelo menos 3 digitos");

        

        for (uint256 i = 0; i < nautsIds.length; i++) {
            bool nameExists = (keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(_nauts[i].name)));
            
            if (nameExists) {
                _nautsExists = true;
            }
        }

        
        return _nautsExists;
        
    }

    // Registrar Navegantes
    function createNauts(string calldata name, string calldata role) external onlyOwner {
        bool _nautsExists = nautsExistsByName(name);

        require(bytes(name).length == 3, "Nome precisa conter pelo menos 3 digitos");
        require(bytes(role).length == 3, "Papel precisa conter pelo menos 3 digitos");

        require(_nautsExists == bool(false),"Navegante existente");
        
        // Adicionado novo id de navegante em nautsIds
        if(nautsIds.length == 0) {
           nautsIds.push(uint256(nautsIds.length)); 
        }
        nautsIds.push(uint256(nautsIds.length));
        _nauts[uint256(nautsIds.length)-1] = Nauts(uint256(nautsIds.length)-1, name, role);
        emit NautsInfo(uint256(nautsIds.length)-1, name, role);
        
       

    }

    // Registrar Navegantes
    function updateNauts(uint256 id, string calldata name, string calldata role) external onlyOwner {
        
        bool _nautsExists = nautsExistsByName(name);

        require(bytes(name).length == 3, "Nome precisa conter pelo menos 3 digitos");
        require(bytes(role).length == 3, "Papel precisa conter pelo menos 3 digitos");
        
        require(_nautsExists == bool(true),"Navegante inexistente");
        // Adicionado novo id de navegante em nautsIds
        _nauts[id] = Nauts(id, name, role);
        emit NautsInfo(id, name, role);
        
    }

    // Pegar quantidade de navegantes registrados
    function getNautsCount() external view returns (uint256) {
        
        return nautsIds.length;
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
        require(msg.sender == owner, "Somente o dono do contrato");
        _;
    }

}