import { Web3Storage } from 'web3.storage'

async function uploadImageIpfsFromBlob(blobFile: Blob, publicAddress: string, client: Web3Storage) {
  const file = [new File([blobFile], `${publicAddress}.jpeg`)]
  const cid = await client.put(file)
  return cid
}

export default uploadImageIpfsFromBlob
