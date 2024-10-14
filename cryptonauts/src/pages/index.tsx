import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { setData, getData } from '../lib/contractFunctions';

export default function Home() {
  const { connectWallet, account } = useAuth()
  const [nauts, setNauts] = useState<any[]>([])
  const [isFormVisible, setFormVisible] = useState(false);
  const [isTableVisible, setTableVisible] = useState(false);
  const [contractData, setContractData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setContractData(data);
      console.log(data)
    };
    fetchData();
  }, []);

  const handleSetData = async () => {
    if (inputValue !== '') {
      // Convert input to a number before passing to the contract
      const parsedValue = parseInt(inputValue, 10);

      // Ensure the value is a valid number
      if (isNaN(parsedValue)) {
        alert("Please enter a valid number.");
        return;
      }

      // Call setData with the parsed value
      await setData(parsedValue);

      // Fetch the updated data after the transaction is confirmed
      const updatedData = await getData();
      setContractData(updatedData);
    }
  };


  const LoadNauts = async() => {
    setTableVisible(true);
    setNauts([
      {email: 'naut1@gmail.com', name: 'Naut 1', role: 'Captain'},
      {email: 'naut2@gmail.com', name: 'Naut 2', role: 'Navigator'},
      {email: 'naut3@gmail.com', name: 'Naut 3', role: 'Engineer'},
      {email: 'naut4@gmail.com', name: 'Naut 4', role: 'Engineer'},
    ])
  }


  // Function to handle adding a new user
  const addUser = (newNaut) => {
    setNauts([...nauts, newNaut]);
    setFormVisible(false); // Hide the form after adding the user
  };

  return (
    <div className="">
      {!account &&
        (
        <div className="flex justify-center items-start h-screen mt-10">
          <button onClick={connectWallet} className="bg-red-500 text-white px-8 py-4 text-lg rounded hover:bg-red-600">
            Connect Wallet
          </button>
        </div>


        )
      }

      {account &&
        (
          <div className="flex mt-4 justify-center mb-5">
          <h2 className="text-white text-lg mr-5">Find the Nauts</h2>
          <button onClick={LoadNauts} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Start
          </button>
          </div>
        )
      }

      {isFormVisible && <UserForm onAddUser={addUser} />}

      {
        isTableVisible &&
        <>
          <button
            className="bg-blue-500 text-white px-6 py-2 mb-6 rounded hover:bg-blue-600"
            onClick={() => setFormVisible(true)}
          >
            Add Naut
          </button>
          <UserTable users={nauts} />

        </>
      }

      <div className="mb-4 text-white">
        <strong>Stored Data in Contract:</strong> {contractData !== null ? contractData : 'Loading...'}
      </div>

      {/* Input to set new data */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter new data"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Button to set data */}
      <button
        onClick={handleSetData}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Set Data
      </button>

    </div>
  );
}
