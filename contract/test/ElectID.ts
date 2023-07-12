import { expect } from 'chai'
import { ethers } from 'hardhat'

const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')

describe('ElectID', function () {
  const ipfsUrl = 'ipfs://QmSgd5FBdkYd68y1eCaWdsv1apoYs3ejhcbfGvhab18Ciq'
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners()
    const ElectID = await ethers.getContractFactory('ElectID')
    const contract = await ElectID.deploy()
    return { contract, owner, otherAccount }
  }

  describe('Deployment', function () {
    it('Should mint an NFT and link it to owner', async function () {
      const { contract, owner } = await loadFixture(deployContract)
      const tx = await contract.safeMint(owner.address, ipfsUrl)
      const receipt = await tx.wait()
      console.log(receipt.events)

      expect(await contract.balanceOf(owner.address)).to.equal(1)
    })
  })
})
