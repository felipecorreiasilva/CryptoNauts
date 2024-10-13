// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoNautsCoinModule", (m) => {
  
  const cryptoNautsCoin = m.contract("CryptoNautsCoin");

  return { cryptoNautsCoin };
  
});
