'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

function Admin() {
  const handleConnect = () => signIn('google')
  const { status } = useSession()

  return (
    <div>
      <button onClick={() => handleConnect()}>Connect</button>
      <button onClick={() => signOut()}>Disconnect</button>
    </div>
  )
}

export default Admin
