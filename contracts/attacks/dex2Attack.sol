// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract dex2Attack is ERC20 {
    constructor() public ERC20("MyToken", "MTK") {
        _mint(msg.sender, 10000000000); // Mint 1,000,000 tokens with the same number of decimals as the parent contract
    }

    function mint(address _to, uint256 _value) public  returns (bool) {
        _mint(_to, _value);
        return true;
    }
}
