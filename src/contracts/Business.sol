// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.7.5;

import "./LandCrowdSale.sol";

contract Bussiness {
    struct businessDetails {
        string name;
        address ownerAddress;
        uint256 landBlockId;
        uint256 nftId;
        uint256 rent;
        string link;
        string lastMileStone;
        string currentMileStone;
        uint256 rentDate;
        bool rentDue;
    }

    mapping(uint256 => businessDetails[]) public nftsBusiness;

    LandCrowdSale _landCrowdSale;

    constructor(address _landSale) public {
        _landCrowdSale = LandCrowdSale(_landSale);
    }

    function getSharesDetails(uint256 _nftId, uint256 _landBlockId)
        public
        view
        returns (
            uint256 nftId,
            uint256 landBlockId,
            address owner,
            bool available,
            bool onLoan,
            address loanedOwner,
            uint256 cleanlinessScore,
            uint256 aavegotchiId,
            uint256 loanDeadLine
        )
    {
        return _landCrowdSale.sharesdetails(_nftId, _landBlockId - 1);
    }

    function getNftDetails(uint256 _nftId)
        public
        view
        returns (
            uint256 id,
            string memory name,
            string memory symbol,
            address admin,
            address erc20Holdable,
            uint256 sqft,
            uint256 pricePerSqft,
            uint256 monthlyRent,
            string memory image,
            uint256 sqftRemaining,
            uint256 shareCounter
        )
    {
        return _landCrowdSale.nftDetails(_nftId);
    }

    function installBusiness(
        uint256 _nftId,
        uint256 _landBlockId,
        string memory _name,
        string memory _link,
        string memory _lastMileStone,
        string memory _currentMileStone,
        uint256 _rent
    ) public {
        nftsBusiness[_nftId].push(
            businessDetails(
                _name,
                msg.sender,
                _landBlockId,
                _nftId,
                _rent,
                _link,
                _lastMileStone,
                _currentMileStone,
                block.timestamp + 30 * 86400,
                false
            )
        );
    }
}
