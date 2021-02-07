// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OwnableERC20Token is ERC20, Ownable {
    constructor(string memory name_, string memory symbol_)
        public
        ERC20(name_, symbol_)
    {}

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }
}
