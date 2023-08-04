import { createWalletClient, custom } from 'viem'
import { sepolia } from 'viem/chains'

export const getClientWallet = () => {
  return createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum)
  })
}

export const getClientAccount = async () => {
  const viemWallet = getClientWallet()
  const [account] = await viemWallet.getAddresses()
  return account
}
