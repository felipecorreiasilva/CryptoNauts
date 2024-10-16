// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoNautsSaleModule", (m) => {
  
  const cryptoNautsSale = m.contract("CryptoNautsSale", ['0x26fF200166F0a163c89a1C9616e98D97AF3164b7','0x61Ec26aA57019C486B10502285c5A3D4A4750AD7']);

  return { cryptoNautsSale };
});
