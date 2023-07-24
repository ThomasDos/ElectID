import { expect } from 'chai'
import { ethers } from 'hardhat'

const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')

describe('ElectID', function () {
  const ipfsUrl = 'ipfs://QmSgd5FBdkYd68y1eCaWdsv1apoYs3ejhcbfGvhab18Ciq'

  async function deployContract() {
    const [owner, otherAccount, secondOtherAccount] = await ethers.getSigners()
    const ElectID = await ethers.getContractFactory('ElectID')
    const contract = await ElectID.deploy()
    return { contract, owner, otherAccount, secondOtherAccount }
  }

  describe('Deployment', function () {
    it('Should mint an NFT and link it to owner', async function () {
      const { contract, owner } = await loadFixture(deployContract)
      await contract.safeMint(owner.address, ipfsUrl)

      expect(await contract.balanceOf(owner.address)).to.equal(1)
    })

    it('Should not be able to transfer NFT to another account', async function () {
      const { contract, owner, otherAccount, secondOtherAccount } = await loadFixture(deployContract)
      await contract.safeMint(otherAccount.address, ipfsUrl)
      await expect(
        contract.connect(otherAccount).safeTransferFrom(otherAccount.address, secondOtherAccount.address, 0)
      ).to.be.revertedWith('Soulbound ERC721: Token not transferable')
    })

    it('Should be able to burn NFT only if its the actual owner', async function () {
      const { contract, otherAccount } = await loadFixture(deployContract)
      await contract.safeMint(otherAccount.address, ipfsUrl)
      expect(await contract.balanceOf(otherAccount.address)).to.equal(1)
      await expect(contract.burn(0)).to.be.revertedWith('ERC721: caller is not token owner or approved')
      await contract.connect(otherAccount).burn(0)
      expect(await contract.balanceOf(otherAccount.address)).to.equal(0)
    })
  })
})
