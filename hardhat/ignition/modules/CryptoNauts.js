// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoNautsModule", (m) => {
  
  const cryptoNauts = m.contract("CryptoNauts", ['0x7Bf75dDb81D0214C8878aF84DB7Fcd83A0E86DD6']);

  return { cryptoNauts };
});
