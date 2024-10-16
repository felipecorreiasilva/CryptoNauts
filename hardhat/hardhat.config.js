require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  allowUnlimitedContractSize: true,
  networks: {
    opsepolia: {
      url: process.env.ALCHEMY_TESTNET_PROVIDER_URL,
      accounts: [`0x${process.env.MM_PRIVATE_KEY}`]
    }
  }
};
