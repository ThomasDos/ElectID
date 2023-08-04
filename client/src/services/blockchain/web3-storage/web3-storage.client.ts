import { Web3Storage } from 'web3.storage'

export function makeStorageClient() {
  return new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY as string })
}
