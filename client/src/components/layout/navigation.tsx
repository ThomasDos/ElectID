import { auth } from '@/services/firebase'
import { useAppSettingsStore } from '@/store/app-settings'
import { ConnectKitButton } from 'connectkit'
import { signOut } from 'firebase/auth'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import toast from 'react-hot-toast'

function Navigation() {
  const { currentUser } = auth
  console.log('currentUser:', currentUser)
  return (
    <nav className='flex justify-between p-6 mb-10 border-b-2'>
      <Link href='/'>
        <div>EID</div>
      </Link>
      <div className='flex items-center gap-10'>
        <Link href='/create-new-id'>
          <div>Create a new ID</div>
        </Link>
        <ConnectKitButton />
        {isEmpty(currentUser) ? (
          <Link href='/admin'>
            <div>Admin</div>
          </Link>
        ) : (
          <div
            className='cursor-pointer'
            onClick={() =>
              signOut(auth)
                .then(() => useAppSettingsStore.setState({ isAdmin: false }))
                .catch((err) => toast.error(err.message))
            }>
            Log out{' '}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
