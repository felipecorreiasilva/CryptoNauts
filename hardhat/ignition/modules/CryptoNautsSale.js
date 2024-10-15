// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CryptoNautsSaleModule", (m) => {
  
  const cryptoNautsSale = m.contract("CryptoNautsSale", ["0x7bE2537C83883f0386C21f102adACe44BC29a1B6", "0x61Ec26aA57019C486B10502285c5A3D4A4750AD7"]);

  return { cryptoNautsSale };
});
