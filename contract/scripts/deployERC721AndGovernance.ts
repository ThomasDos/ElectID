import { ethers } from 'hardhat'

const TIMELOCK_CONTROLLER_MIN_DELAY = 60 * 5 // 5 minutes

async function main() {
  const [owner] = await ethers.getSigners()
  console.log('owner:', owner)

  const transactionCount = await owner.getNonce()
  console.log('transactionCount:', transactionCount)

  // gets the address of the token before it is deployed
  const futureAddress = ethers.getCreateAddress({
    from: owner.address,
    nonce: transactionCount + 1
  })
  console.log('futureAddress:', futureAddress)

  const EIDGovernor = await ethers.getContractFactory('EIDGovernor')
  const governor = await EIDGovernor.deploy(futureAddress)
  console.log('governor DEPLOY:', governor)
  await governor.waitForDeployment()
  console.log('waited deployment')
  const governorAddress = await governor.getAddress()
  console.log('governorAddress:', governorAddress)

  const ElectID = await ethers.getContractFactory('ElectID')
  const token = await ElectID.deploy(governorAddress)
  await token.waitForDeployment()
  const tokenAddress = await token.getAddress()

  console.log(`Governor deployed to ${governorAddress}`, `Token deployed to ${tokenAddress}`)
}

// EIDGovernor address : 0xc36FFf14198BC269D2316CcDDEAD60D5c763DBB8

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
