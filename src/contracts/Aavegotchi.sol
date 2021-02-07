pragma solidity >=0.6.2 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AavegotchiNFT is ERC721{ 
    
    struct Aavegotchi {
        uint gotchiCategoryId;
        uint id;
        uint nftId;
        uint blockId;
        string image;
        address owner;
        bool allowPeopleStake;
        uint yieldCut;
    }
    
    struct AllGotchi {
        uint id;
        string image;
    }
    
    uint public portalCounter;
    uint public gotchiCounter;
    uint public soldGotchis;
    
    mapping(uint => Aavegotchi) public Aavegotchis;
    mapping(uint => Aavegotchi[]) public nftsAavegotchi;
    mapping(address => Aavegotchi[]) public usersGotchi;
    mapping(uint => AllGotchi) public Gotchis;
    
    constructor() ERC721("AavegotchiNFT", "AVG") public {
    }
    
    function addGotchiToGame (
        string memory _image
    ) public {
        gotchiCounter++;
        Gotchis[gotchiCounter] = AllGotchi(gotchiCounter, _image );
    }
    
    function buyPortals (uint _randomGotchi) public returns (uint, string memory) {
        portalCounter++;
        AllGotchi storage gotchis = Gotchis[_randomGotchi];
        return (gotchis.id, gotchis.image);
    }
    
    function buyAavegotchi(uint _gotchisCategoryId, uint _nftId, uint _blockId, string memory _image, bool _allowPeopleStake, uint _yieldCut) public {
        soldGotchis++;
        
        super._mint(msg.sender, soldGotchis);
        
        nftsAavegotchi[_nftId].push(Aavegotchi(_gotchisCategoryId, soldGotchis, _nftId, _blockId, _image, msg.sender, _allowPeopleStake, _yieldCut));
        usersGotchi[msg.sender].push(Aavegotchi(_gotchisCategoryId, soldGotchis, _nftId, _blockId, _image, msg.sender, _allowPeopleStake, _yieldCut));
        Aavegotchis[soldGotchis] = Aavegotchi(_gotchisCategoryId, soldGotchis, _nftId, _blockId, _image, msg.sender, _allowPeopleStake, _yieldCut);
    }
    
    function getAavegotchi(uint gotchiId) public view returns (
        uint,
        uint, 
        uint,
        uint,
        string memory,
        address,
        bool,
        uint
    ) {
        Aavegotchi storage aavegotchi = Aavegotchis[gotchiId];
        return (
            aavegotchi.gotchiCategoryId,
            aavegotchi.id, 
            aavegotchi.nftId, 
            aavegotchi.blockId,
            aavegotchi.image,
            aavegotchi.owner,
            aavegotchi.allowPeopleStake,
            aavegotchi.yieldCut
        );
    }
    
}