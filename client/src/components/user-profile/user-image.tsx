import { storage } from '@/services/firebase'
import convertBytesToImage from '@/utils/convertBytesToImage'
import { getBytes, ref } from 'firebase/storage'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useWalletClient } from 'wagmi'

function UserImage() {
  const [userImage, setUserImage] = useState('')
  const { data: walletData } = useWalletClient()

  useEffect(() => {
    if (!walletData?.account?.address) return

    const storageRef = ref(storage, walletData?.account?.address)

    getBytes(storageRef)
      .then((bytes) => {
        const imageConverted = convertBytesToImage(bytes)
        setUserImage(imageConverted)
      })
      .catch((error) => {
        setUserImage('')
      })
  }, [walletData])

  if (!userImage) return null

  return <Image src={userImage} width={250} height={250} alt='user picture' className='my-10' />
}

export default UserImage
