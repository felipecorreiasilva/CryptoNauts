'use client'

import { links } from '@/constants/NavLinks'
import Link from 'next/link'
import React from 'react'
import { IoMenu } from 'react-icons/io5'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
    const { connectWallet, disconnectWallet, account } = useAuth()

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Project Title */}
        <div className="text-white text-lg font-bold">
          CryptoNauts
        </div>

        {/* Links and Button */}
        <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white">
                About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">
                Contact
            </Link>
            {!account ?
                (<button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Connect Wallet</button>)
                :
                (
                (<button onClick={disconnectWallet} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Disconnect</button>)
                )
            }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
