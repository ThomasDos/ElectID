import { ethers } from 'hardhat'

async function main() {
  const ElectID = await ethers.getContractFactory('ElectID')
  const token = await ElectID.deploy()
  await token.waitForDeployment()
  const address = await token.getAddress()
  console.log(`Token deployed to ${address}`)
}

// EIDGovernor address : 0xc36FFf14198BC269D2316CcDDEAD60D5c763DBB8

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
