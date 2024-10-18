'use client'

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react'
import { MdGeneratingTokens } from "react-icons/md";
import { ethers, parseUnits } from 'ethers';
import { DecodedError, ErrorDecoder } from 'ethers-decode-error';
import { toast } from 'react-toastify';

type buyTokensType = {
  
    amount: number,
  
}

const CryptoNautsCoin = require("@/contracts/CryptoNautsCoin.json");
const CryptoNauts = require("@/contracts/CryptoNautsSale.json");
const ABI = [CryptoNautsCoin.abi,CryptoNauts.abi];
const addressCNCoin = String(process.env.ADDRESS_CNCOIN);
const addressCNSale = String(process.env.ADDRESS_CNSALE);

const page = () => {
    const {connectWallet,account} = useAuth()
    
    
    

    const [formData, setFormData] = useState<buyTokensType>({
        amount: 0,
      });

    const [contractBalanceOf, setContractBalanceOf] = useState<Number|null>();

      useEffect(() => {
        const handleFetchData = async() => {
          const {provider,signer} = await connectWallet();
          const contractCNCoin = new ethers.Contract(addressCNCoin, ABI[0], signer);
          await contractCNCoin.waitForDeployment();
          const balanceOf = await contractCNCoin.balanceOf(process.env.ADDRESS_CNSALE);
          console.log((Number(balanceOf)/1e2).toFixed(2))
          setContractBalanceOf(balanceOf);

        }
        handleFetchData()
      }, [contractBalanceOf])

    const handleOnChange = (e:any)=> {

        e.preventDefault()
    
        switch(e.target.name){
        
          default:
            const newObj = {...formData,[e.target.name]:e.target.value}
            setFormData(newObj)
            break
            
        }
     
      }

      const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const {provider,signer} = await connectWallet();
        
        const contractCNSale = new ethers.Contract(addressCNSale, ABI[1], signer);
        await contractCNSale.waitForDeployment();
        const nonce = await signer.getNonce();

        const gasPrice = (await provider.getFeeData()).gasPrice;
        const gasLimit = 5000000;
        
        const getTokenPrice = await contractCNSale.getTokenPrice();
        const getETHPrice = await contractCNSale.getETHPrice();
        const totalCostInUSD = Number(getTokenPrice)*formData.amount;
        
        const requiredEther = (totalCostInUSD / Number(getETHPrice)).toFixed(18);

        let options = {
          gasPrice,
          gasLimit,
          nonce,
          value: ethers.parseUnits(requiredEther, 'ether'),
        }
        
        let rawTransaction = await signer.signTransaction(options);
        console.log("rawTransaction", rawTransaction)
        contractCNSale.buyToken(formData.amount, Number(formData.amount*1e2), {...options}).then(async (buyToken)=>{
        let _response = await buyToken.wait();
        console.log('buyToken', buyToken)
        console.log('_response', _response)
        toast.success(`Parabéns compra realizada com sucesso`)
        setContractBalanceOf(null)
        }).catch (async(error:any) =>{

          const errorDecoder = ErrorDecoder.create()
          const decodedError: DecodedError = await errorDecoder.decode(error)
          toast.error(`${(decodedError.reason)}`)
          console.log(error)

        }) 
           
      }

  return (
    <Card className='bg-primary-900 border-none mx-auto text-white w-[512px] h-full'>
        
        <CardTitle>
          
            <div className="flex justify-center pt-16">
            <MdGeneratingTokens className='text-yellow-600 w-12 h-12' />
            
            </div>
            <p className="flex justify-center pt-2 pb-16 text-white">{contractBalanceOf ? (Number(contractBalanceOf)/1e2).toFixed(2):0}</p>
            
        </CardTitle>
            
        
        <CardContent className='px-16'>
        <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">

                <label className="relative flex justify-center">
                  
                  <input 
                  required
                  name='amount'
                  placeholder='Digite quantidade de CNCoin' 
                  className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                  focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-1/2"
                  value={formData.amount}
                  onChange={handleOnChange}
                  type="number" />
                  <p className='absolute
                  peer-focus:-translate-y-5 peer-focus:text-sm left-24 top-[6px] ml-2 px-2 duration-300 bg-primary-900 peer-valid:text-sm peer-valid:-translate-y-5'>
                  Quantidade
                  <span 
                  className='text-red-500 ml-1'>
                  *</span>
                  </p>
                  
                  
                </label>

                <div className="flex">
                
                <button 
                type='submit'
                className='w-32 mt-6 ml-auto border-2 text-black hover:text-white border-black hover:bg-black rounded-lg text-center p-[8px]' 
                >Comprar</button>
    
                </div>

                </div>
                
            </form>

        </CardContent>
        <CardFooter>
            
        </CardFooter>
    </Card>
  )
}

export default page