"use client"
// import UserTable from "@/components/UserTable.jsx";
import { useAuth } from "@/context/AuthContext";
import { ethers } from "ethers";
import { DecodedError, ErrorDecoder } from "ethers-decode-error";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserTable from "@/components/UserTable";

const CryptoNautsCoin = require("@/contracts/CryptoNautsCoin.json");
const CryptoNauts = require("@/contracts/CryptoNauts.json");
const ABI = [CryptoNautsCoin.abi,CryptoNauts.abi];
const addressCNCoin = String(process.env.ADDRESS_CNCOIN);
const addressCNauts = String(process.env.ADDRESS_CNAUTS);

export default function page() {
  const [nauts, setNauts] = useState<any[]>([]);
  // Load initial contract data
  const {connectWallet,account} = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      
      const {provider,signer} = await connectWallet();
      const contractNauts = new ethers.Contract(addressCNauts, ABI[1], signer);
      await contractNauts.waitForDeployment();
      await contractNauts.getAllNauts().then((getAllNauts:any) => {
        
        console.log('getAllNauts', getAllNauts)
        setNauts(getAllNauts);
        
      }).catch (async(error:any) =>{

        const errorDecoder = ErrorDecoder.create()
        const decodedError: DecodedError = await errorDecoder.decode(error)
        toast.error(`${(decodedError.reason)}`)
        console.log(error)

      })
      
    };
    fetchData();
  }, []);

    return (
      <>
        <UserTable nauts={nauts}/>
      </>
    )
  
}