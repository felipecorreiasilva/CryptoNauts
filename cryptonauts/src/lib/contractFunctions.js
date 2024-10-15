import { ethers } from 'ethers';
import LockABI from '../contracts/abi/LockABI.json'; // Assuming LockABI is for the `setData` contract
import PersonRegistryABI from '../contracts/abi/PersonRegistryABI.json'; // New ABI for the Person contract

// Addresses of the deployed contracts
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Address for Lock contract
const PERSON_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';  // Address for PersonRegistry contract

// Function to set data in the Lock contract
export const setData = async (newData) => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LockABI, signer);

      const tx = await contract.setData(newData);
      await tx.wait();
      console.log('Transaction confirmed:', tx);
    } else {
      alert('Please install MetaMask');
    }
  } catch (error) {
    console.error('Error setting data:', error);
  }
};

// Function to get data from the Lock contract
export const getData = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LockABI, provider);
      const data = await contract.getData();
      return data.toString();
    } else {
      alert('Please install MetaMask');
    }
  } catch (error) {
    console.error('Error getting data:', error);
  }
};

// Function to add a new person to the PersonRegistry contract
export const addPerson = async (name, email, role) => {
  console.log('Adding person:', name, email, role);
  try {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('Provider:', provider);
      const signer = provider.getSigner();
      console.log('Signer:', signer);
      console.log('PersonRegistryABI:', PersonRegistryABI, PERSON_ADDRESS);
      const contract = new ethers.Contract(PERSON_ADDRESS, PersonRegistryABI, signer);
      console.log('Contract:', contract);
      const tx = await contract.addPerson(name, email, role);
      await tx.wait();
      console.log('Person added:', tx);
    } else {
      alert('Please install MetaMask');
    }
  } catch (error) {
    console.error('Error adding person:', error);
  }
};

// Function to retrieve all people from the PersonRegistry contract
export const getPeople = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(PERSON_ADDRESS, PersonRegistryABI, provider);

      const people = await contract.getPeople(); // Fetch people from the contract

      if (!people || people.length === 0) {
        console.log('No people found in the contract.');
        return [];
      }

      return people.map(person => ({
        name: person.name,
        email: person.email,
        role: person.role
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
      const contract = new ethers.Contract(PERSON_ADDRESS, PersonRegistryABI, provider);
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

// Function to get the count of people in the PersonRegistry contract
export const getPeopleCount = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(PERSON_ADDRESS, PersonRegistryABI, provider);
      const count = await contract.getPeopleCount();
      return count.toNumber();
    } else {
      alert('Please install MetaMask');
    }
  } catch (error) {
    console.error('Error getting people count:', error);
  }
};
