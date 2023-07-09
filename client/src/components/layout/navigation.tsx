import { ConnectKitButton } from 'connectkit'
import Link from 'next/link'

function Navigation() {
  return (
    <nav className='flex justify-between p-4'>
      <Link href='/'>
        <div>EID</div>
      </Link>
      <ConnectKitButton />
    </nav>
  )
}

export default Navigation
