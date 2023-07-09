import { getDefaultConfig } from 'connectkit'
import { createConfig, sepolia } from 'wagmi'

export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY, // or infuraId
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    chains: [sepolia],

    // Required
    appName: 'ElectID',
    // Optional
    appDescription: 'the future of fair elections',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png' // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
)
