import { ethers } from 'ethers';
import LockABI from '../contracts/abi/LockABI.json';

// Address of the deployed contract
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// Function to set data in the contract
export const setData = async (newData) => {
  try {
    // Check if MetaMask is available
    if (typeof window.ethereum !== 'undefined') {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create an instance of a provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the signer (which represents the connected account)
      const signer = provider.getSigner();

      // Create a contract instance with the signer to send transactions
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LockABI, signer);

      // Call the contract's setData function (ensure newData is a number)
      const tx = await contract.setData(newData);
      await tx.wait(); // Wait for the transaction to be confirmed
      console.log('Transaction confirmed:', tx);
    } else {
      alert('Please install MetaMask');
    }
  } catch (error) {
    console.error('Error setting data:', error);
  }
};


// Function to get data from the contract
export const getData = async () => {
  try {
    // Check if MetaMask is available
    if (typeof window.ethereum !== 'undefined') {
      // Create an instance of a provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the contract instance with a read-only provider
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LockABI, provider);

      // Call the contract's getData function
      const data = await contract.getData();
      return data.toString(); // Return the data
    } else {
      alert('Please install MetaMask');
    }
  } catch (error) {
    console.error('Error getting data:', error);
  }
};
