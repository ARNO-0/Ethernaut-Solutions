const { ethers } = require("hardhat");

const { BigNumber } = require("ethers");

const CONTRACT_ADDRESS = "0x6F1216D1BFe15c98520CA1434FC1d9D57AC95321";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

async function main() {
  const playerWallet = await ethers.getSigner(PLAYER_ADDRESS);

  const contractInterface = ["function destroy(address payable _to) public"];

  const transactionCount = await provider.getTransactionCount(CONTRACT_ADDRESS);
  console.log(`Transaction count for address : ${transactionCount}`);
  const recomputedContractAddress = ethers.utils.getContractAddress({
    from: CONTRACT_ADDRESS,
    nonce: BigNumber.from(`1`),
  });
  const contract = new ethers.Contract(
    recomputedContractAddress,
    contractInterface,
    playerWallet
  );
  await contract.destroy(PLAYER_ADDRESS);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
