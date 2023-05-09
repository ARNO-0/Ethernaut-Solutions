require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/rvlt4DPUorFa_vsqJ9GpXTG86TolTNT2`,
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
