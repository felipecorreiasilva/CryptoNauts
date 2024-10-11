const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("CryptoNauts", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCryptoNautsFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const CryptoNauts = await ethers.getContractFactory("CryptoNauts");
    const cryptoNauts = await CryptoNauts.deploy();

    return { cryptoNauts, owner, otherAccount };
  }

  // describe("Deployment", function () {
  //   it("test cryptoNauts", async function () {
  //     const { cryptoNauts } = await loadFixture(deployCryptoNautsFixture);

  //     expect(await cryptoNauts.getAllNauts());
  //   });

    
  // });

  
});
