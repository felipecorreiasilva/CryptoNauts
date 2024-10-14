'use client'

import { ethers } from 'ethers';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    account: null,
    walletBalance: '0', // Default to '0' instead of null
    setAccount: function (value: any) { return value },
    connectWallet: function () { },
    disconnectWallet: function () { },
});

interface AuthProviderProps {
    children: ReactNode;
}

const API_KEY_TEST_NETWORK = process.env.NEXT_PROVIDER_URL_TEST_NETWORK;

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any | null>(AuthContext);

const getInitialAuth = () => {
    const account = (typeof window !== 'undefined') && localStorage.getItem('account');
    return account && JSON.parse(account);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [account, setAccount] = useState<any | null>(getInitialAuth);
    const [walletBalance, setWalletBalance] = useState<string>('0'); // Initialize walletBalance to '0'

    const requestAccount = async () => {
        console.log('Requesting account: ');

        if (!window.ethereum) return alert('MetaMask not detected');
        console.log('MetaMask detected');
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            console.log(accounts);
            setAccount(accounts[0]); // Update to set the first account as active
            return accounts[0];
        } catch (err) {
            console.log('Error: ', err);
        }
    };

    const connectWallet = async () => {
        if (!window.ethereum) return alert('MetaMask not detected');

        const account = await requestAccount();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account); // Fetch wallet balance
        const balanceInEth = ethers.utils.formatEther(balance); // Convert balance to Ether
        setWalletBalance(balanceInEth); // Store the balance
    };

    const disconnectWallet = async () => {
        if (!window.ethereum) return alert('MetaMask not detected');

        console.log('MetaMask detected');
        try {
            await window.ethereum.request({
                method: 'wallet_revokePermissions',
                params: [
                    {
                        eth_accounts: {},
                    },
                ],
            });
            setAccount(null);
            setWalletBalance('0'); // Reset the balance to '0' when disconnected
        } catch (err) {
            console.log('Error: ', err);
        }
    };

    useEffect(() => {
        localStorage.setItem('account', JSON.stringify(account));
    }, [account]);

    useEffect(() => {
        const verifyAccount = async () => {
            if (!window.ethereum) return alert('MetaMask not detected');
            const verify = await window.ethereum.request({
                method: 'wallet_getPermissions',
                params: [],
            });
            if (verify.length === 0) {
                setAccount(null);
                setWalletBalance('0'); // Reset balance to '0' if no account is connected
            }
        };
        verifyAccount();
    }, []);

    const value = {
        account,
        walletBalance, // Provide the balance in the context
        setAccount,
        connectWallet,
        disconnectWallet,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
