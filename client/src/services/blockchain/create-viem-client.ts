import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

const viemClient = createPublicClient({
  chain: sepolia,
  transport: http()
})

export default viemClient
