import { ELECTID_ABI } from '@/app/(constant)/CONTRACT_ABI'
import { ELECTID_CONTRACT_ADDRESS } from '@/app/(constant)/CONTRACT_ADDRESS'
import uploadImageIpfsFromBlob from '@/services/blockchain/web3-storage/upload-image-ipfs-from-blob'
import uploadMetadataIpfs from '@/services/blockchain/web3-storage/upload-metadata-ipfs'
import { PendingUser } from '@/types/pending-users'
import { getClientAccount, getClientWallet } from './create-viem-wallet'
import { makeStorageClient } from './web3-storage/web3-storage.client'

interface UploadMetadataAndMintNft {
  userImageBlob: Blob
  user: PendingUser
}

async function uploadMetadataAndMintNft({ userImageBlob, user }: UploadMetadataAndMintNft) {
  try {
    const account = await getClientAccount()
    const web3Client = makeStorageClient()
    const cidImg = await uploadImageIpfsFromBlob(userImageBlob, user.public_key, web3Client)
    const cidMetadata = await uploadMetadataIpfs(cidImg, user, web3Client)
    const viemWallet = getClientWallet()

    const tx = await viemWallet.writeContract({
      address: ELECTID_CONTRACT_ADDRESS,
      abi: ELECTID_ABI,
      functionName: 'safeMint',
      args: [user.public_key, cidMetadata],
      account
    })

    return tx
  } catch (error) {
    console.log('error mint NFT', error)
    return null
  }
}

export default uploadMetadataAndMintNft
