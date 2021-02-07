// SPDX-License-Identifier: MIT

pragma solidity >=0.6.12;

import {ERC20Token as ERC20} from "./token/ERC20Token.sol";
import {
    OwnableERC20Token as OwnableERC20Token
} from "./token/OwnableERC20Token.sol";

contract DelegationController {
    struct DelegationDetails {
        uint256 amountLocked;
        uint256 interestRate;
        uint256 amountBorrowed;
        mapping(address => bool) approved;
        mapping(address => uint256) borrowers;
    }

    mapping(address => mapping(address => DelegationDetails)) public details;
    mapping(address => address) public tokenTorToken;

    function lockCollateral(
        address token,
        uint256 amount,
        uint256 interestRate
    ) public {
        require(token != address(0), "DelegationController: invalid address");
        require(amount > 0, "DelegationController: invalid amount");

        address rToken = tokenTorToken[token];

        DelegationDetails storage detail = details[msg.sender][address(token)];

        if (rToken != address(0)) {
            ERC20(token).transferFrom(msg.sender, address(this), amount);

            OwnableERC20Token(rToken).mint(msg.sender, amount);
        } else {
            ERC20(token).transferFrom(msg.sender, address(this), amount);

            OwnableERC20Token newRToken =
                new OwnableERC20Token(
                    string(abi.encodePacked("refunging ", ERC20(token).name())),
                    string(abi.encodePacked("r", ERC20(token).symbol()))
                );

            newRToken.mint(msg.sender, amount);
            tokenTorToken[token] = address(newRToken);
        }

        if (detail.amountLocked == 0 && detail.amountBorrowed == 0)
            detail.interestRate = interestRate;
        detail.amountLocked += amount;
        detail.amountBorrowed += 0;
    }

    function approve(address borrower, address token) public {
        address rToken = tokenTorToken[token];
        require(rToken != address(0), "DelegationController: invalid token");

        DelegationDetails storage detail = details[msg.sender][token];

        require(
            !detail.approved[msg.sender],
            "DelegationController: you are not approved"
        );

        detail.approved[borrower] = true;
    }

    function borrow(
        address delegator,
        address token,
        uint256 amount
    ) public {
        require(amount > 0, "DelegationController: invalid amount");
        address rToken = tokenTorToken[token];
        require(rToken != address(0), "DelegationController: invalid token");

        DelegationDetails storage detail = details[delegator][token];

        require(
            detail.approved[msg.sender],
            "DelegationController: you are not approved"
        );
        require(
            detail.amountLocked - detail.amountBorrowed > 0,
            "DelegationController: not allowed"
        );
        require(
            detail.amountLocked - detail.amountBorrowed >= amount,
            "DelegationController: not allowed"
        );

        detail.amountBorrowed = detail.amountBorrowed + amount;
        detail.borrowers[msg.sender] += amount;

        ERC20(token).transfer(msg.sender, amount);
    }

    function payBackDebt(
        address delegator,
        address token,
        uint256 amount
    ) public {
        require(amount > 0, "DelegationController: invalid amount");
        address rToken = tokenTorToken[token];
        require(rToken != address(0), "DelegationController: invalid token");

        DelegationDetails storage detail = details[delegator][token];

        detail.amountBorrowed = detail.amountBorrowed - amount;
        detail.borrowers[msg.sender] -= amount;

        ERC20(token).transferFrom(msg.sender, address(this), amount);
    }
}
