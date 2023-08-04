import { db } from '@/services/firebase'
import { PendingUser } from '@/types/pending-users'
import { collection, getDocs } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'
import UserCardReview from './UserCardReview'

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
    <>
      <div className='px-10'>
        <div className='flex flex-col text-center '>
          <div>Dashboard Admin</div>
          <span>You have {pendingUsers.length} pending user(s) to review</span>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-5'>
          {pendingUsers.map((pendingUser) => (
            <UserCardReview
              pendingUser={pendingUser}
              key={pendingUser.public_key}
              removeUserFromPendingUsers={(publicKey) => removeUserFromPendingUsers(publicKey)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default AdminView
