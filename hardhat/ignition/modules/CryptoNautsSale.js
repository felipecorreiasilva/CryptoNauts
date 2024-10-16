// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoNautsSaleModule", (m) => {
  
  const cryptoNautsSale = m.contract("CryptoNautsSale", ['0x7Bf75dDb81D0214C8878aF84DB7Fcd83A0E86DD6','0x61Ec26aA57019C486B10502285c5A3D4A4750AD7']);

  return { cryptoNautsSale };
  
});
