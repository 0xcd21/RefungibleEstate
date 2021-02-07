pragma solidity >=0.6.2 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AavegotchiNFT is ERC721 {
    struct Aavegotchi {
        uint256 gotchiCategoryId;
        uint256 id;
        uint256 nftId;
        uint256 blockId;
        string image;
        address owner;
        bool allowPeopleStake;
        uint256 yieldCut;
    }

    struct AllGotchi {
        uint256 id;
        string image;
    }

    uint256 public portalCounter;
    uint256 public gotchiCounter;
    uint256 public soldGotchis;

    mapping(uint256 => Aavegotchi) public Aavegotchis;
    mapping(uint256 => Aavegotchi[]) public nftsAavegotchi;
    mapping(address => Aavegotchi[]) public usersGotchi;
    mapping(uint256 => AllGotchi) public Gotchis;

    constructor() public ERC721("AavegotchiNFT", "AVG") {}

    function addGotchiToGame(string memory _image) public {
        gotchiCounter++;
        Gotchis[gotchiCounter] = AllGotchi(gotchiCounter, _image);
    }

    function buyPortals(uint256 _randomGotchi)
        public
        returns (uint256, string memory)
    {
        portalCounter++;
        AllGotchi storage gotchis = Gotchis[_randomGotchi];
        return (gotchis.id, gotchis.image);
    }

    function buyAavegotchi(
        uint256 _gotchisCategoryId,
        uint256 _nftId,
        uint256 _blockId,
        string memory _image,
        bool _allowPeopleStake,
        uint256 _yieldCut
    ) public {
        soldGotchis++;

        super._mint(msg.sender, soldGotchis);

        nftsAavegotchi[_nftId].push(
            Aavegotchi(
                _gotchisCategoryId,
                soldGotchis,
                _nftId,
                _blockId,
                _image,
                msg.sender,
                _allowPeopleStake,
                _yieldCut
            )
        );
        usersGotchi[msg.sender].push(
            Aavegotchi(
                _gotchisCategoryId,
                soldGotchis,
                _nftId,
                _blockId,
                _image,
                msg.sender,
                _allowPeopleStake,
                _yieldCut
            )
        );
        Aavegotchis[soldGotchis] = Aavegotchi(
            _gotchisCategoryId,
            soldGotchis,
            _nftId,
            _blockId,
            _image,
            msg.sender,
            _allowPeopleStake,
            _yieldCut
        );
    }

    function getAavegotchi(uint256 gotchiId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            string memory,
            address,
            bool,
            uint256
        )
    {
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
