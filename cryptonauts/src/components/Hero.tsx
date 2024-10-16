import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <div className='text-white sm:flex justify-center sm:space-x-28 mx-auto'>
        
        <div className="">
            <h1 className='text-[70px] text-center sm:text-start font-fontWarlock'>CryptoNauts</h1>
            <p className='sm:text-[36px] text-[24px] text-center sm:text-start font-fontLindra'>Prepare-se para a maior viagem da terra.</p>
            <div className="text-sm sm:text-base text-center sm:text-start">
                <p className=''>A muito tempo procuramos um novo planeta para viver.</p>
                <p className=''>Se torne mais um em nossa lista de navegantes.</p>
                
                  <p className='sm:flex'>Registros de navegantes em rede blockchain.
                  <Link className='flex sm:ml-1 justify-center text-cyan-600' href="/signUpNauts">Inscrever-se <FaArrowRight className='my-auto ml-1'/></Link>
                  </p>
                  
                
                
            </div> 

            <div className="sm:ml-auto mx-auto sm:mx-0 mt-6 border-2 text-black hover:text-white border-black hover:bg-black w-[150px] rounded-lg text-center p-[12px]">
                <Link className='' href="/buyTokens">Comprar CNCoin</Link>
            </div>
              
        </div>
        
        <div className="sm:mt-0 mt-16">
            <img src='rocket.png' className='text-xl'/>
        </div>
        
        
    </div>
  )
}

export default Hero