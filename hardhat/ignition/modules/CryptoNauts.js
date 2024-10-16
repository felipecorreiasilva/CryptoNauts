// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoNautsModule", (m) => {
  
  const cryptoNauts = m.contract("CryptoNauts", ['0x26fF200166F0a163c89a1C9616e98D97AF3164b7']);

  return { cryptoNauts };
});
