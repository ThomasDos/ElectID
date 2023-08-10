'use client'
import { auth } from '@/services/firebase'
import { useAppSettingsStore } from '@/store/app-settings'
import { ConnectKitButton } from 'connectkit'
import { signOut } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import styled from 'styled-components'

const StyledNavTitle = styled.div<{ isCurrent: boolean }>`
  color: #333;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &:hover {
    color: var(--color-primary);
  }
  padding: ${(props) => (props.isCurrent ? '5px 10px' : 'none')};
  border: ${(props) => (props.isCurrent ? '2px solid var(--color-primary)' : 'none')};
  border-radius: ${(props) => (props.isCurrent ? '20px' : 'none')};
`

function Navigation() {
  const isAdmin = useAppSettingsStore((state) => state.isAdmin)
  const pathname = usePathname()

  return (
    <nav className='flex justify-between p-6 mb-10'>
      <Link href='/'>
        <div className='flex items-center gap-2'>
          <Image src='/svg/electid-logo.svg' alt='ElectID Logo' width={50} height={50} />
          <span className='text-2xl font-bold text-primary'>ElectID</span>
        </div>
      </Link>
      <div className='flex items-center gap-10'>
        <Link href='/'>
          <StyledNavTitle isCurrent={pathname === '/'}>Home</StyledNavTitle>
        </Link>
        <Link href='/create-new-id'>
          <StyledNavTitle isCurrent={pathname === '/create-new-id'}>Create a new ID</StyledNavTitle>
        </Link>

        <Link href='/admin'>
          <StyledNavTitle isCurrent={pathname === '/admin'}>Admin</StyledNavTitle>
        </Link>
        {isAdmin && (
          <StyledNavTitle isCurrent={false}>
            <div
              className='cursor-pointer text-base'
              onClick={() =>
                signOut(auth)
                  .then(() => useAppSettingsStore.setState({ isAdmin: false }))
                  .catch((err) => toast.error(err.message))
              }>
              Log out
            </div>
          </StyledNavTitle>
        )}
      </div>
      <ConnectKitButton theme='retro' />
    </nav>
  )
}

export default Navigation
