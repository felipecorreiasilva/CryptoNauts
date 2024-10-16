'use client'

import { NonceManager } from 'ethers';
import { ethers } from 'ethers';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';


const AuthContext = createContext({
    account: [null],
    setAccount: function (value: any) { return value },
    connectWallet: function () { },
    disconnectWallet: function () { },

});

interface AuthProviderProps {
    children: ReactNode;
}

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any | null>(AuthContext);

const getInitialAuth = () => {
    const account = (typeof window !== 'undefined') && localStorage.getItem('account')
    return account && JSON.parse(account)
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [account, setAccount] = useState<any | null>(getInitialAuth);

    const requestAccount = async () => {
        console.log('Requesting account: ')

        if (!window.ethereum) return alert('Meta mask not detected')

        console.log('detected')
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setAccount(accounts)
            return accounts
        } catch (err) {
            console.log('error: ', err)
        }

    }

    const connectWallet = async () => {

        if (!window.ethereum) return alert('Meta mask not detected')
        
        const _accounts = await requestAccount();

        // const provider = new ethers.providers.AlchemyProvider('optimism', process.env.ALCHEMY_API_KEY);
        // const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_TESTNET_PROVIDER_URL);
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const privateKey = String(process.env.WALLET_PRIVATE_KEY_B);
        const apiAlchemy = String(process.env.ALCHEMY_TESTNET_PROVIDER_URL);
        const provider = ethers.getDefaultProvider(apiAlchemy)
              
        // await provider.send("eth_accounts", []);
        const wallet = new ethers.Wallet(privateKey, provider)
        const signer = new NonceManager(wallet);
        
        // const signer = provider.getSigner(_accounts[0]);
        // const signer = wallet.connect(provider);

        return ({provider,signer})

    }

    const sendTransaction = async (_to:string, value:string) => {

        if (!window.ethereum) return alert('Meta mask not detected')

        const _accounts = await requestAccount();

        window.ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: _accounts[0],
        to: _to,
        gas: "0x76c0", // 30400
        gasPrice: "0x9184e72a000", // 10000000000000
        value: `${ethers.parseEther(value)}`, // 2441406250
        data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
                    },
                ],
            })

            .then((result:any) => {
                console.log('Result tx: ', result);
                // The result varies by RPC method.
                // For example, this method returns a transaction hash hexadecimal string upon success.
            })
            .catch((error:any) => {
                console.log('Error tx: ', error);
                // If the request fails, the Promise rejects with an error.
            })


    }

    const disconnectWallet = async () => {
        if (!window.ethereum) return alert('Meta mask not detected')

        console.log('detected')
        try {
            await window.ethereum.request({
                "method": "wallet_revokePermissions",
                "params": [
                    {
                        "eth_accounts": {}
                    }
                ]
            });
            setAccount(null)
        } catch (err) {
            console.log('error: ', err)
        }


    }

    useEffect(() => {
        localStorage.setItem('account', JSON.stringify(account))
    }, [account]);

    // useEffect(() => {
    //     localStorage.setItem('provider', JSON.stringify(provider))
    // }, [provider]);

    // useEffect(() => {
    //     localStorage.setItem('signer', JSON.stringify(signer))
    // }, [signer]);

    useEffect(() => {
        const verifyAccount = async () => {
            if (!window.ethereum) return alert('Meta mask not detected')
            const verify = await window.ethereum.request({
                "method": "wallet_getPermissions",
                "params": []
            });
            if (verify.length == 0) {
                setAccount(null)
            }
        }
        verifyAccount()
    }, []);



    const value = {
        account,
        setAccount,
        connectWallet,
        disconnectWallet

    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};