require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    opsepolia: {
      url: process.env.ALCHEMY__TESTNET_PROVIDER_URL,
      accounts: [`0x${process.env.MM_PRIVATE_KEY}`]
    }
  }
};
