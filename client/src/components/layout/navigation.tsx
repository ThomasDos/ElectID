import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'

function Navigation() {
  return (
    <nav className='flex justify-between p-4'>
      <Link href='/'>
        <div>EID</div>
      </Link>
      <div className='flex items-center gap-2'>
        <Link href='/admin'>
          <div>Admin</div>
        </Link>
        <ConnectKitButton />
      </div>
    </nav>
  )
}

export default Navigation
