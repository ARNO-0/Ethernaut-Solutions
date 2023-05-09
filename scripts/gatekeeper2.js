const { ethers } = require("hardhat");
require("dotenv").config();
const CONTRACT_ADDRESS = "0xeC4cFde48EAdca2bC63E94BB437BbeAcE1371bF3";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  // Deploy the PayableContract
  const GatekeeperAttackFactory2 = await ethers.getContractFactory(
    "GatekeeperAttack2",
    signer
  );
  const GatekeeperAttack2 = await GatekeeperAttackFactory2.deploy(
    CONTRACT_ADDRESS
  );
  await GatekeeperAttack2.deployed();
  console.log("PayableContract deployed to:", GatekeeperAttack2.address);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
