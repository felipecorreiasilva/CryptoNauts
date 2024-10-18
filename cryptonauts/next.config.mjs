/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ALCHEMY_MAINNET_PROVIDER_URL:process.env.ALCHEMY_MAINNET_PROVIDER_URL,
        ALCHEMY_TESTNET_PROVIDER_URL:process.env.ALCHEMY_TESTNET_PROVIDER_URL,
        ALCHEMY_API_KEY:process.env.ALCHEMY_API_KEY,
        WALLET_PRIVATE_KEY:process.env.WALLET_PRIVATE_KEY,
        WALLET_PRIVATE_KEY_B:process.env.WALLET_PRIVATE_KEY_B,
        ADDRESS_CNCOIN:process.env.ADDRESS_CNCOIN,
        ADDRESS_CNAUTS:process.env.ADDRESS_CNAUTS,
        ADDRESS_CNSALE:process.env.ADDRESS_CNSALE,
        
    },
};

export default nextConfig;
