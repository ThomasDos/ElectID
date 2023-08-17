import ButtonSuccess from '@/components/ui/ButtonSuccess'
import H1Custom from '@/components/ui/H1Custom'
import H2Custom from '@/components/ui/H2Custom'
import H3Custom from '@/components/ui/H3Custom'
import { db } from '@/services/firebase'
import { PendingUser } from '@/types/pending-users'
import { collection, getDocs } from 'firebase/firestore/lite'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import UserCardReview from './UserCardReview'

function AdminView() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])

  const removeUserFromPendingUsers = (publicKey: PendingUser['public_key']) => {
    const pendingUsersTemp = pendingUsers.filter((pendingUser) => pendingUser.public_key !== publicKey)
    setPendingUsers(pendingUsersTemp)
  }

  const handleGetStarted = () => {}

  useEffect(() => {
    getDocs(collection(db, 'pending_users')).then((querySnapshot) => {
      const pendingUsersTemp: PendingUser[] = []
      querySnapshot.forEach((doc) => {
        pendingUsersTemp.push({ ...(doc.data() as PendingUser) })
      })
      setPendingUsers(pendingUsersTemp)
    })
  }, [])

  return (
    <main className='flex flex-col items-center px-10 sm:px-20 md:px-40'>
      <div className='flex justify-center py-8'>
        <div className='flex flex-col justify-center w-3/5 pr-4'>
          <H1Custom className='mb-10'>Admin Dashboard</H1Custom>
          <H3Custom className='mb-10'>
            Welcome to our platform where cutting-edge technology meets democratic participation. Explore the world of
            decentralized identity voting.
          </H3Custom>
          <ButtonSuccess className='mt-10 w-max' onClick={handleGetStarted}>
            <Link href='#pending-users'>Get Started</Link>
          </ButtonSuccess>
        </div>
        <div className='flex justify-end'>
          <Image src='/svg/phone-validation-id.svg' alt='' width={750} height={750} />
        </div>
      </div>

      <div className='my-40 w-full' id='pending-users'>
        <H2Custom className='mb-10'>Pending users</H2Custom>
        <div className='grid xl:grid-cols-2 gap-8'>
          {pendingUsers.map((pendingUser) => (
            <UserCardReview
              key={pendingUser.public_key}
              pendingUser={pendingUser}
              removeUserFromPendingUsers={(publicKey) => removeUserFromPendingUsers(publicKey)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default AdminView
