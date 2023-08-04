import { ethers } from 'hardhat'
import { ELECTID_CONTRACT_ADDRESS } from '../constant/CONTRACT_ADDRESS'

async function delegate() {
  const [owner] = await ethers.getSigners()
  const electIdContract = await ethers.getContractAt('ElectID', ELECTID_CONTRACT_ADDRESS)

  await electIdContract.delegate(owner.address)
  console.log('The owner :', owner.address, 'has delegated their votes to themselves')
}

delegate().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
