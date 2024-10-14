'use client'

import { links } from '@/constants/NavLinks'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const { connectWallet, disconnectWallet, account, walletBalance } = useAuth() // Assuming you have balance from your context
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Project Title */}
        <div className="text-white text-lg font-bold">
          CryptoNauts
        </div>

        {/* Links and Wallet Menu */}
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

          {!account ? (
            <button
              onClick={connectWallet}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {account[0].slice(0,3)}...{account[0].slice(-4)} {/* Shortened wallet address */}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="p-4 border-b">
                    <span className="block text-gray-800 font-semibold">Wallet</span>
                    <span className="block text-sm text-gray-500">
                        {account[0].slice(0, 3)}...{account[0].slice(-4)}
                    </span>
                    <span className="block text-sm text-gray-800 font-bold">
                      Balance: {walletBalance} ETH
                    </span>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={disconnectWallet}
                      className="w-full text-left text-red-600 px-4 py-2 hover:bg-red-100 rounded"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
