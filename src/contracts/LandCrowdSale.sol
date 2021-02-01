// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.7.5;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./token/SharesToken.sol";

contract LandCrowdSale {
    address payable public vault;
    uint256 public landCounter = 0;

    struct NFTDetailsStruct {
        uint256 id;
        string name;
        string symbol;
        address admin;
        address erc20Holdable;
        uint256 sqft;
        uint256 pricePerSqft;
        uint256 monthlyRent;
        string image;
        uint256 sqftRemaining;
        uint256 shareCounter;
    }

    struct NFTSharesStruct {
        uint256 nftId;
        uint256 landBlockId;
        address owner;
        bool available;
        bool onLoan;
        address loanedOwner;
        uint256 cleanlinessScore;
        uint256 aavegotchiId;
        uint256 loanDeadLine;
    }

    mapping(uint256 => ShareToken) public shareTokens;
    mapping(uint256 => address) public nftTokens;
    mapping(uint256 => NFTDetailsStruct) public nftDetails;
    mapping(uint256 => mapping(address => NFTSharesStruct[]))
        public usersSharesdetails;
    mapping(uint256 => NFTSharesStruct[]) public sharesdetails;
    mapping(uint256 => mapping(address => uint256)) public sharesCount;

    constructor() public {
        vault = msg.sender;
    }

    function _mint(
        string memory _name,
        string memory _symbol,
        uint256 _totalSqft,
        uint256 _pricePerSqft,
        uint256 _monthlyRent,
        string memory _image,
        address nftAddress
    ) public {
        landCounter++;

        nftTokens[landCounter] = nftAddress;

        ShareToken _shareToken = new ShareToken(_name, _symbol, _totalSqft);
        shareTokens[landCounter] = _shareToken;

        nftDetails[landCounter] = NFTDetailsStruct(
            landCounter,
            _name,
            _symbol,
            msg.sender,
            address(_shareToken),
            _totalSqft,
            _pricePerSqft,
            _monthlyRent,
            _image,
            _totalSqft,
            0
        );
    }

    function buyShare(uint256 _nftID, uint256[] memory _landBlockID)
        public
        payable
    {
        require(msg.sender != vault, "Admin cannot buy shares");

        uint256 _shareAmount = _landBlockID.length;
        NFTDetailsStruct memory _nftDetails = nftDetails[_nftID];
        _nftDetails.shareCounter = _nftDetails.shareCounter + 1;
        _nftDetails.sqftRemaining = _nftDetails.sqftRemaining - _shareAmount;
        nftDetails[_nftID] = _nftDetails;

        uint256 userShare = sharesCount[_nftID][msg.sender];

        for (uint256 i = 0; i < _landBlockID.length; i++) {
            usersSharesdetails[_nftID][msg.sender].push(
                NFTSharesStruct(
                    _nftID,
                    _landBlockID[i],
                    msg.sender,
                    false,
                    false,
                    msg.sender,
                    0,
                    0,
                    0
                )
            );
            sharesdetails[_nftID].push(
                NFTSharesStruct(
                    _nftID,
                    _landBlockID[i],
                    msg.sender,
                    false,
                    false,
                    msg.sender,
                    0,
                    0,
                    0
                )
            );
        }

        if (userShare > 0) {
            userShare = userShare + _shareAmount;
            sharesCount[_nftID][msg.sender] = userShare;
        } else {
            sharesCount[_nftID][msg.sender] = _shareAmount;
        }

        // REF.approve(msg.sender, _amount);
        // REF.transferFrom(msg.sender, vault, _amount);
        shareTokens[_nftID].transferFrom(
            address(this),
            msg.sender,
            _shareAmount
        );
    }
}
