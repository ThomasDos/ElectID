import { PendingUser } from '@/types/pending-users'
import { Web3Storage } from 'web3.storage'

async function uploadMetadataIpfs(cidImage: string, user: PendingUser, client: Web3Storage) {
  const { firstname, lastname, public_key, created_at } = user
  const name = `${firstname} ${lastname}`
  const imageURI = `https://${cidImage}.ipfs.dweb.link/${public_key}.jpeg`

  const nftJSON = JSON.stringify({
    name,
    attributes: [
      {
        trait_type: 'firstname',
        value: firstname
      },
      {
        trait_type: 'lastname',
        value: lastname
      },
      {
        trait_type: 'public_key',
        value: public_key
      },
      {
        trait_type: 'created_at',
        value: created_at
      }
    ],
    image: imageURI,
    description: 'ElectID soulbounded'
  })

  const blob = new Blob([nftJSON], { type: 'application/json' })
  const files = [new File([blob], `${user.public_key}.json`)]

  const cid = await client.put(files)
  const cidURI = `https://${cid}.ipfs.dweb.link/${user.public_key}.json`
  return cidURI
}

export default uploadMetadataIpfs
