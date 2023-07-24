import { ethers } from 'hardhat'

const nftMetadataURI =
  'https://bafybeicm2rwlyeds4utlxmiqgnxmlgthls4tosqvotpo2mfuvoxwzspddy.ipfs.dweb.link/0xcCE64F20d934f320137F84A1Adbfa8E53AAAaa4C.json'

async function deployAndMint() {
  const [owner] = await ethers.getSigners()
  // if you changed the name of the contract, be sure to update this here!
  //   const ElectID = await ethers.getContractFactory('ElectID')
  const nftContract = await ethers.getContractAt('ElectID', '0x513cE4c8354bDc1271Dea3446D6618A3568B88Ce')
  //   const nftContract = await ElectID.deploy()

  //   await nftContract.waitForDeployment()

  //   console.log('NFT deployed to:', await nftContract.getAddress())

  // update the IPFS CID to be your metadata CID
  const tx = await nftContract.safeMint(owner.address, nftMetadataURI)
  const receipt = await tx.wait()
  console.log('receipt:', receipt)
  console.log('NFT Minted!')
}

// EIDGovernor address : 0xc36FFf14198BC269D2316CcDDEAD60D5c763DBB8
// ElectID address : 0x513cE4c8354bDc1271Dea3446D6618A3568B88Ce

deployAndMint().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
