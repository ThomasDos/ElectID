import { ELECTID_ABI } from '@/constant/CONTRACT_ABI'
import { ELECTID_CONTRACT_ADDRESS } from '@/constant/CONTRACT_ADDRESS'
import { getContract } from 'viem'
import viemClient from './create-viem-client'

const contractElectId = getContract({
  address: ELECTID_CONTRACT_ADDRESS,
  abi: ELECTID_ABI,
  publicClient: viemClient
})

export default contractElectId
