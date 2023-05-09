require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: process.env.MAINNET,
        blockNumber: 17207385,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Or the specific port you're using
      timeout: 100000,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.5.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  paths: {
    artifacts: "./build",
  },
};
