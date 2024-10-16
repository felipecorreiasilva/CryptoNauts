"use client"

import UserTable from "@/components/UserTable";
import { useEffect, useState } from "react";
import { getNauts } from '../../lib/contractFunctions.js';

export default function page() {
  const [nauts, setNauts] = useState<any[]>([]);

  // Load initial contract data
  useEffect(() => {
    const fetchData = async () => {
      const data = await LoadNauts();
      setNauts(data);
      console.log(data);
    };
    fetchData();
  }, []);

  // Function to load nauts using the getNauts method from the smart contract
  const LoadNauts = async () => {
    try {
      const people = await getNauts(); // Fetch people from the contract
      setNauts(people);
    } catch (error) {
      console.error('Error loading nauts:', error);
    }
  };

  return (
    <>
      <UserTable nauts={nauts} />
    </>
  );
}
