import { ethers } from 'hardhat'
import { ELECTID_CONTRACT_ADDRESS } from '../constant/CONTRACT_ADDRESS'

async function getVotes() {
  const [owner] = await ethers.getSigners()
  const electIdContract = await ethers.getContractAt('ElectID', ELECTID_CONTRACT_ADDRESS)

  const votes = await electIdContract.getVotes(owner.address)
  console.log('votes:', votes.toString())
}

getVotes().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
