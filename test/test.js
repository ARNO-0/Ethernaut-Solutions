const { ethers } = require("hardhat");
describe("Claim function", function () {
  it("Should call claim function on forked mainnet", async function () {
    await ethers.provider.send("hardhat_setBalance", [
      "0xab0E0f83646278D6CA7652B164E4b21Db3EF717B",
      "0x56BC75E2D63100000", // 100 ETH (ETH -> WEI -> Hexdecimal)
    ]);
    const contractAddress = "0x00e7a28f725bf5c561946548c6cf8836d8c4d4bd";
    const contractAbi = [
      {
        inputs: [
          { internalType: "contract IERC20", name: "_token", type: "address" },
          { internalType: "bytes32", name: "_merkleRoot", type: "bytes32" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "claimer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "Claimed",
        type: "event",
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
      },
      {
        inputs: [
          { internalType: "bytes32[]", name: "merkleProof", type: "bytes32[]" },
        ],
        name: "claim",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
        name: "emergencyWithdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "hasClaimed",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "isAirdropEnabled",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "merkleRoot",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bytes32", name: "_merkleRoot", type: "bytes32" },
        ],
        name: "setMerkleRoot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "bool", name: "_isAirdropEnabled", type: "bool" },
        ],
        name: "toggleAirdrop",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "token",
        outputs: [
          { internalType: "contract IERC20", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const merkleProof = [
      "0x5ee432823ce064fae22206985c5369a115d74b95e625462e5ceddb2d23690d64",
      "0x3f7fae423182cbc7df1e774f695fc9c6b94d75f8ceec8f8b8d7ff65814c4aee6",
      "0x4cc8a33e7441beeb674b57fec1ce6b51b4046e900e7dbf604d0c9f9dbc57cbc3",
      "0x8fea2a8f28d8f7f1cb5c20e1bf92067a9c2db173b51f6db478b907cb16a188ab",
      "0x95681f699948178ec0ff22dd4c18b70dd5768e6875876ba2f2b81d03f23e86a0",
      "0xe0ee7ce0d1feee15bb64f3e83a8b6e1830494db1cbfb7e4afabb3e807cce873e",
      "0xa64e6aaf2f49df4b2e287c936b46193c722c35f3015f6703937eef518f411df4",
      "0x09a324ab30be07ff6d14dd12fe79a67d85b41e7a5f6409787ee8982756c1a85d",
      "0x7e51a6d72be12c4a7c6e30ff2ecb18b792aa62bd724d3c6bb8e6312ddc4c50dd",
      "0x9805416484b18ad67428b416333cd5070778bf174a835633c85e58fa327f573a",
      "0x525e27b0753eb35ae5df90ebc61302ee8dc50fb409170554f1b06f0c25840b68",
      "0x648204af862c592f38910b88425d8d749a060738b965b105c9a3f8fb7b553bcc",
      "0x85b1f4ef15855787e05cf0a401cbdd024968f28f3aa012c3c31fe99e7ccfe517",
      "0x460a7bda1a337ae96d48e19e88992c97008b7cf686f583eb8a75ed062757950e",
      "0xcac93b946717b71f457e11120664e169bdb765e84e0d7413c5ac567c94ca885a",
      "0xc5aa421096afa62a76dd4a17daf03f348b41fb482cc73e0572e74c02ae90f0bf",
      "0x62d85b2f991d6264b385958d4aba97b6e3dc7474df31b94702170222a8d446f7",
      "0xd319c9ccade7e8e62ed22154e7a55778c4078a285dac190c85f0ac8b421f2853",
      "0x19adba39f2abf05c592a5a29f5a376e68da701f19034ed3f4be822a84a318d22",
      "0x36dcf5b2f3b3a2726be71a34250fceace7343f108b96f5dfea9118d3f4f3b531",
      "0x5ab97c4982f697ca27b2792be682d3f972e43a5f83887f0acc2977d16434234e",
    ];

    const signer = await ethers.getImpersonatedSigner(
      "0xab0E0f83646278D6CA7652B164E4b21Db3EF717B"
    );
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const isEnabled = await contract.isAirdropEnabled();
    const merkleRoot = await contract.merkleRoot();
    console.log(isEnabled);
    console.log(merkleRoot);

    // Call the claim function on the forked mainnet
    const tx = await contract.claim(merkleProof);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log(receipt);
  });
});
