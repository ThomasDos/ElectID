import '@nomicfoundation/hardhat-toolbox'
import dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: 'hardhat',
  networks: {
    sepolia: {
      url: process.env.TESTNET_SEPOLIA_ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY as string, process.env.PRIVATE_KEY_2 as string]
    }
  }
}

export default config
