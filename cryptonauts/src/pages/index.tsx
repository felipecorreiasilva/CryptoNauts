import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  setData, getData, addPerson, getPeople, getPerson, getPeopleCount
} from '../lib/contractFunctions';

export default function Home() {
  const { connectWallet, account } = useAuth();
  const [nauts, setNauts] = useState<any[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [isTableVisible, setTableVisible] = useState(false);
  const [contractData, setContractData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Load initial contract data
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPeople();
      setNauts(data);
      console.log(data);
    };
    fetchData();
  }, []);

  // Handle setting data in the contract
  const handleSetData = async () => {
    if (inputValue !== '') {
      const parsedValue = parseInt(inputValue, 10);

      if (isNaN(parsedValue)) {
        alert("Please enter a valid number.");
        return;
      }

      await setData(parsedValue);
      const updatedData = await getData();
      setContractData(updatedData);
    }
  };

  // Function to load nauts using the getPeople method from the smart contract
  const LoadNauts = async () => {
    setTableVisible(true);
    try {
      const people = await getPeople(); // Fetch people from the contract
      setNauts(people);
    } catch (error) {
      console.error('Error loading nauts:', error);
    }
  };

  // Function to handle adding a new user using the addPerson method
  const addUser = async (newNaut) => {
    try {
      const { name, email, role } = newNaut;
      await addPerson(name, email, role); // Add person to the smart contract
      setNauts([...nauts, newNaut]); // Update local state with the new person
      setFormVisible(false); // Hide the form after adding the user
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  return (
    <div className="">
      {!account && (
        <div className="flex justify-center items-start h-screen mt-10">
          <button onClick={connectWallet} className="bg-red-500 text-white px-8 py-4 text-lg rounded hover:bg-red-600">
            Connect Wallet
          </button>
        </div>
      )}

      {account && (
        <div className="flex mt-4 justify-center mb-5">
          <h2 className="text-white text-lg mr-5">Find the Nauts</h2>
          <button onClick={LoadNauts} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Start
          </button>
        </div>
      )}

      {isFormVisible && <UserForm onAddUser={addUser} />}

      {isTableVisible && (
        <>
          <button
            className="bg-blue-500 text-white px-6 py-2 mb-6 rounded hover:bg-blue-600"
            onClick={() => setFormVisible(true)}
          >
            Add Naut
          </button>
          <UserTable users={nauts} />
        </>
      )}
    </div>
  );
}
