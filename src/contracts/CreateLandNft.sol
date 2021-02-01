// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.8.0;

import "./token/Nft.sol";

contract CreateLandNft {
    struct tokens {
        string name;
        address tokenAddress;
    }

    uint256 counter;
    mapping(uint256 => tokens) public landsAddress;

    function _mint(
        string memory _name,
        string memory _symbol,
        uint256 _id
    ) public {
        counter++;
        NftToken _nftToken = new NftToken(_name, _symbol, msg.sender, _id);
        landsAddress[counter] = tokens(_name, address(_nftToken));
    }
}
