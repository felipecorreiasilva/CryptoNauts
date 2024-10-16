import { ethers } from 'ethers';
const CryptoNautsCoin = require("@/contracts/CryptoNautsCoin.json");
const CryptoNauts = require("@/contracts/CryptoNauts.json"); // New ABI for the Person contract

// Addresses of the deployed contracts
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Address for Lock contract
const CRUD_ADDRESS = '0x140190AdCf1f7E83f790832E7DB283E8bCe8C7Bf';  // Address for PersonRegistry contract
import { useAuth } from '@/context/AuthContext';

export const getNauts = async () => {
  const { connectWallet, account } = useAuth();
  const { provider, signer } = await connectWallet();

  const gasPrice = (await provider.getFeeData()).gasPrice
  const gasLimit = ethers.hexlify(new Uint8Array([5000000]));

  const contractCNCoin = new ethers.Contract(addressCNCoin, ABI[0], signer);
  await contractCNCoin.waitForDeployment();
  const contractCNauts = new ethers.Contract(addressCNauts, ABI[1], signer);
  await contractCNauts.waitForDeployment();
  const nonce = await signer.getNonce();

  let options = {
    gasPrice,
    gasLimit,
    nonce,
  }

  await signer.signTransaction(options);

  try {
    if (typeof window.ethereum !== 'undefined') {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CRUD_ADDRESS, CryptoNauts, provider);

      const nauts = await contract.getAllNauts(); // Fetch nauts from the contract

      if (!nauts || nauts.length === 0) {
        console.log('No nauts found in the contract.');
        return [];
      }

      return nauts.map(naut => ({
        name: naut.name,
        email: naut.email,
        role: naut.role
      }));
    } else {
      alert('Please install MetaMask');
    }
  } catch (error) {
    console.error('Error getting people:', error);
  }
};


// Function to retrieve a single person by index from the PersonRegistry contract
export const getPerson = async (index) => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CRUD_ADDRESS, PersonRegistryABI, provider);
      const person = await contract.getPerson(index);
      return {
        name: person.name,
        email: person.email,
        role: person.role,
      };
    } else {
      alert('Please install MetaMask');
    }
  } catch (error) {
    console.error('Error getting person:', error);
  }
};
