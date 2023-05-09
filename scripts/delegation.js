const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x94957cF90d605065402aF5e218BeCc5bCB70ECc2";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  // Send the transaction
  try {
    // Encode the function call data

    const tx = {
      to: CONTRACT_ADDRESS,
      data: "0xdd365b8b0000000000000000000000000000000000000000000000000000000000000000",
    };

    const txn = await signer.sendTransaction(tx);
    console.log(txn);
    // Wait for the transaction to be mined
    await txn.wait();
  } catch (error) {
    console.error("Error while sending transaction:", error);
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
