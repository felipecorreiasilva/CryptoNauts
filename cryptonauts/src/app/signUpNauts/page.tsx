'use client'

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext';
import { ethers } from 'ethers';
import { DecodedError, ErrorDecoder } from 'ethers-decode-error';
import React, { useState } from 'react'
import { LiaUserAstronautSolid } from "react-icons/lia";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type SignUpType = {
  
    username: string,
    role: string,
    email: string,
  
}
const CryptoNautsCoin = require("@/contracts/CryptoNautsCoin.json");
const CryptoNauts = require("@/contracts/CryptoNauts.json");
const ABI = [CryptoNautsCoin.abi,CryptoNauts.abi];
const addressCNCoin = String(process.env.ADDRESS_CNCOIN);
const addressCNauts = String(process.env.ADDRESS_CNAUTS);

const selectRole = ['Informe seu papel','Pilot','Captain','Engineer','Member'];

const page = () => {
    
    const {connectWallet,account} = useAuth();

    const [formData, setFormData] = useState<SignUpType>({
        username: '',
        role: '',
        email: ''
      });

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

        let rawTransaction = await signer.signTransaction(options);
        console.log("rawTransaction", rawTransaction)
        contractCNauts.createNauts(formData.email,formData.username,formData.role).then(async(signUpNauts:any) =>{
          const signUpNautsData = await signUpNauts.data;
          const signUpNautsDecoded = new ethers.Interface(ABI[1]);
          const _signUpNautsDecoded = signUpNautsDecoded.decodeFunctionData('createNauts',signUpNautsData)
          const _getPriceRegister = await contractCNauts.getPriceRegister();
          const balance = await contractCNCoin.balanceOf(account[0])
          console.log(balance);
          let _transfer = await contractCNCoin.transfer(process.env.ADDRESS_CNSALE, BigInt(Number(_getPriceRegister)*1e18));
          
          let _response = await _transfer.wait();
          console.log('signUpNauts: ', signUpNauts)
          console.log('resultData: ', _signUpNautsDecoded)
          console.log('value: ', signUpNauts.value)
          console.log('value: ', _transfer)
          console.log('value: ', _response)
          toast.success(`Parabéns registrado como navegante`)
        }).catch (async(error:any) =>{

          const errorDecoder = ErrorDecoder.create()
          const decodedError: DecodedError = await errorDecoder.decode(error)
          console.log(`${(decodedError.reason)}`)
          toast.error(`${(decodedError.reason)}`)

        }) 
          
        
        
       
      }

  return (
    <Card className='bg-primary-900 border-none mx-auto text-white w-[512px] h-full'>
        
        <CardTitle>
            <div className="flex justify-center py-16">
            <LiaUserAstronautSolid className='w-12 h-12' />
            </div>
            
        </CardTitle>
            
        
        <CardContent className='px-16'>
        <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">

                <label className="relative">
                  
                  <input 
                  required
                  name='username'
                  placeholder='Digite seu nome completo' 
                  className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                  focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                  value={formData.username}
                  onChange={handleOnChange}
                  type="text" />
                  <p className='absolute
                  peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[6px] ml-2 px-2 duration-300 bg-primary-900 peer-valid:text-sm peer-valid:-translate-y-5'>
                  Nome
                  <span 
                  className='text-red-500 ml-1'>
                  *</span>
                  </p>
                  
                  
                </label>

                <label className="relative">
                  
                  <input 
                  required
                  name='email'
                  placeholder='Digite seu endereço de email' 
                  className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                  focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                  value={formData.email}
                  onChange={handleOnChange}
                  type="email" />
                  <p className='absolute
                  peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[6px] ml-2 px-2 duration-300 bg-primary-900 peer-valid:text-sm peer-valid:-translate-y-5'>
                  Endereço de email
                  <span 
                  className='text-red-500 ml-1'>
                  *</span>
                  </p>
                  
                </label>

                <label className="relative">
                  
                  <select 
                  required
                  name='role' 
                  className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-white focus:text-neutral-500 border rounded-md outline-none 
                  focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                  value={formData.role}
                  onChange={handleOnChange}
                  >
                    {
                        selectRole.map((role:string,i:number) => {
                            return <option key={i} className='' value={role}>{role}</option>
                        })
                    }
                  </select>
                  <p className='absolute
                  peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[6px] ml-2 px-2 duration-300 bg-primary-900 peer-valid:text-sm peer-valid:-translate-y-5'>
                  Papel
                  <span 
                  className='text-red-500 ml-1'>
                  *</span>
                  </p>
                  
                  
                </label>

                <div className="flex">
                
                <button 
                type='submit'
                className='w-32 mt-6 ml-auto border-2 text-blue-800 hover:text-white border-blue-800 hover:bg-blue-800 rounded-lg text-center p-[8px]' 
                >Inscrever-se</button>
    
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