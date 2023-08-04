import { makeStorageClient } from './web3-storage.client'

async function uploadImageIpfsFromBlob(blobFile: Blob, publicAddress: string) {
  const client = makeStorageClient()
  const file = [new File([blobFile], `${publicAddress}.jpeg`)]
  const cid = await client.put(file)
  return cid
}

export default uploadImageIpfsFromBlob
