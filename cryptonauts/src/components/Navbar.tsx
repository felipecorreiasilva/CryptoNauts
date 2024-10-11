'use client'

import { links } from '@/constants/NavLinks'
import Link from 'next/link'
import React from 'react'
import { IoMenu } from 'react-icons/io5'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
    const {connectWallet,disconnectWallet,account} = useAuth()
    

  return (
    <nav className='fixed w-full bg-primary-950 scroll'>

        <ul className='hidden sm:flex justify-between p-8 text-white'>
            <div className="">
                <li className='p-2'>
                    <Link
                    className='font-fontTitleHomeb text-blue-900 shadow-2xl'
                    href={'/'}

                    >CryptoNauts</Link>
                </li>
            </div>

            <div className="sm:flex space-x-8">
                
                    {links.map((link:any, i:number)=>{
                        return (
                            <div key={i}>
                            { i != 2 ? (
                                <li className={`hover:border-b hover:border-b-blue-900 hover:text-blue-900 p-2  `} key={i}>
                                <Link href={link.path}>{link.name}</Link>
                                </li> 

                            ):<>
                                {!account?
                                (<button onClick={connectWallet} className='border-2 text-blue-900 hover:text-white border-blue-900 
                                rounded-lg hover:bg-blue-900 p-2'>{link.name}</button>)
                                :
                                (
                                (<button onClick={disconnectWallet} className='border-2 text-blue-900 hover:text-white border-blue-900 
                                rounded-lg hover:bg-blue-900 p-2'>Disconnect</button>)
                                )
                                }
                                
                            </>
                            
                            }
                            </div>
                            
                        )
                    })}
                
            </div>
            
        </ul>
        
        <ul className='sm:hidden flex justify-between p-8'>
            
                <li>
                    <Link
                    href={'/'}

                    >Game Store</Link>
                </li>
            
                <li className=''>
                    <button className='h-6 w-6'>
                        <IoMenu />
                    </button>
                    
                </li>
        </ul>
        
    </nav>
  )
}

export default Navbar