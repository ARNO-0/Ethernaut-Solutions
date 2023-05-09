const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x553BED26A78b94862e53945941e4ad6E4F2497da";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";

async function main() {
  const signers = await ethers.getSigners();
  const playerWallet = await ethers.getSigner(PLAYER_ADDRESS);
  const contractInterface = [
    "function transfer(address _to, uint256 _value) public returns (bool)",
    "function INITIAL_SUPPLY() public view returns (uint256)",
    "function approve(address spender, uint256 amount) public returns (bool)",
    "function allowance(address owner, address spender) public view returns (uint256)",
    "function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)",
  ];
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    signers[10]
  );
  const playerInstance = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    playerWallet
  );
  const value = await contract.INITIAL_SUPPLY();
  await playerInstance.approve(signers[10].address, value);
  const allowance = await contract.allowance(
    PLAYER_ADDRESS,
    signers[10].address
  );
  console.log(allowance.toBigInt());
  const tx = await contract.transferFrom(
    PLAYER_ADDRESS,
    signers[11].address,
    value
  );
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
