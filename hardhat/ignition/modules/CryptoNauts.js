// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoNautsModule", (m) => {
  
  const cryptoNauts = m.contract("CryptoNauts", ['0x7B51fb7615d12221447B57BC6d268847153A7461']);

  return { cryptoNauts };
});
