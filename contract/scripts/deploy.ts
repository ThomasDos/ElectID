import { ethers } from 'hardhat'

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
  console.log('governor:', governor)

  const ElectID = await ethers.getContractFactory('ElectID')
  const token = await ElectID.deploy(governor.address)

  console.log(`Governor deployed to ${governor.address}`, `Token deployed to ${token.address}`)
}

// EIDGovernor address : 0xc36FFf14198BC269D2316CcDDEAD60D5c763DBB8
// ElectID address : 0xE353Cf5865932B3Fdb1C506fB478fa2b9674f142

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
