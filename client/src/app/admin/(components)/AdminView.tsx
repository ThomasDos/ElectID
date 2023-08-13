import ButtonSuccess from '@/components/ui/ButtonSuccess'
import { db } from '@/services/firebase'
import { PendingUser } from '@/types/pending-users'
import { collection, getDocs } from 'firebase/firestore/lite'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledH1 = styled.h1`
  color: #333;
  font-size: 56px;
  font-weight: 800;
  line-height: 73px; /* 130.357% */
  letter-spacing: -0.56px;
  margin-bottom: 40px;
`

const StyledH2 = styled.h2`
  color: #333;
  font-size: 20px;
  line-height: 33px; /* 165% */
  margin-bottom: 40px;
`

function AdminView() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])

  const removeUserFromPendingUsers = (publicKey: PendingUser['public_key']) => {
    const pendingUsersTemp = pendingUsers.filter((pendingUser) => pendingUser.public_key !== publicKey)
    setPendingUsers(pendingUsersTemp)
  }

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
    <main className='flex flex-col items-center px-40'>
      <div className='flex justify-center py-8'>
        <div className='flex flex-col justify-center w-3/5 pr-4'>
          <StyledH1>Admin Dashboard</StyledH1>
          <StyledH2>
            Welcome to our platform where cutting-edge technology meets democratic participation. Explore the world of
            decentralized identity voting.
          </StyledH2>
          <ButtonSuccess className='mt-10'>Get Started</ButtonSuccess>
        </div>
        <div className='flex justify-end'>
          <Image src='/svg/phone-validation-id.svg' alt='' width={750} height={750} />
        </div>
      </div>

      <div>
        <h2>Pending users</h2>
      </div>
    </main>
  )
}

export default AdminView
