pragma solidity >=0.6.0 <0.7.5;

import "./token/SharesToken.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";

contract LandCrowdSale {
    address payable public vault;
    uint public landCounter = 0;
    
    struct NFTDetailsStruct {
        uint id;
        string name;
        string symbol;
        address admin;
        address erc20Holdable;
        uint sqft;
        uint pricePerSqft;
        uint monthlyRent;
        string image;
        uint sqftRemaining;
        uint shareCounter;
    }
    
    struct NFTSharesStruct {
        uint nftId;
        uint landBlockId;
        address owner;
        bool available;
        bool onLoan;
        address loanedOwner;
        uint cleanlinessScore;
        uint aavegotchiId;
        uint loanDeadLine;
    }
    
    mapping(uint => ShareToken) public shareTokens;
    mapping(uint => address) public nftTokens;
    mapping(uint => NFTDetailsStruct) public nftDetails;
    mapping(uint => mapping(address => NFTSharesStruct[])) public usersSharesdetails;
    mapping(uint => NFTSharesStruct[]) public sharesdetails;
    mapping(uint => mapping(address => uint)) public sharesCount;
    
    constructor() public {
        vault = msg.sender;
    }
    
    function _mint(
        string memory _name,
        string memory _symbol, 
        uint _totalSqft, 
        uint _pricePerSqft,
        uint _monthlyRent,
        string memory _image,
        address nftAddress
    ) public {
        
        landCounter++;
        
        nftTokens[landCounter] = nftAddress;
        
        ShareToken _shareToken = new ShareToken(_name, _symbol, _totalSqft);
        shareTokens[landCounter] = _shareToken;
        
        nftDetails[landCounter] = NFTDetailsStruct(landCounter, _name, _symbol, msg.sender, address(_shareToken), _totalSqft, _pricePerSqft, _monthlyRent, _image, _totalSqft, 0);
    }
    
    function buyShare(uint _nftID, uint[] memory _landBlockID) public payable {
        require(msg.sender != vault, 'Admin cannot buy shares');
        
        uint _shareAmount = _landBlockID.length; 
        NFTDetailsStruct memory _nftDetails = nftDetails[_nftID];
        _nftDetails.shareCounter = _nftDetails.shareCounter + 1;
        _nftDetails.sqftRemaining = _nftDetails.sqftRemaining - _shareAmount;
        nftDetails[_nftID] = _nftDetails;
       
        uint userShare = sharesCount[_nftID][msg.sender];

        for (uint i = 0; i < _landBlockID.length; i++) {
            usersSharesdetails[_nftID][msg.sender].push(NFTSharesStruct(_nftID, _landBlockID[i], msg.sender, false, false, msg.sender, 0, 0, 0));
            sharesdetails[_nftID].push(NFTSharesStruct(_nftID, _landBlockID[i], msg.sender, false, false, msg.sender, 0, 0, 0));
        }
        
        if (userShare > 0) {
            userShare = userShare + _shareAmount;
            sharesCount[_nftID][msg.sender] = userShare;
        } else {
            sharesCount[_nftID][msg.sender] = _shareAmount;
        }
        
        // REF.approve(msg.sender, _amount);
        // REF.transferFrom(msg.sender, vault, _amount);
        shareTokens[_nftID].transferFrom(address(this), msg.sender, _shareAmount);
    }
    
    function onLonNFT(uint _nftID, uint _blockId) public {
        NFTSharesStruct storage _nftSharesDetails = sharesdetails[_nftID][_blockId - 1];
        _nftSharesDetails.onLoan = true;
        _nftSharesDetails.loanDeadLine = block.timestamp + 30 days;
        
        NFTSharesStruct memory _nftSharesDetails2 = usersSharesdetails[_nftID][_nftSharesDetails.owner][_blockId - 1];
        usersSharesdetails[_nftID][_nftSharesDetails.owner][_blockId - 1] = _nftSharesDetails2;
        
    }
}