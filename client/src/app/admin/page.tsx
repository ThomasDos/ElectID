'use client'
import { db } from '@/services/firebase'
import { useAppSettingsStore } from '@/store/app-settings'
import { ConnectKitButton } from 'connectkit'
import { collection, getDocs } from 'firebase/firestore/lite'
import Link from 'next/link'
import { useEffect } from 'react'
import { useWalletClient } from 'wagmi'

function Admin() {
  const { data: walletData } = useWalletClient()

  useEffect(() => {
    if (!walletData?.account?.address) return

    if (walletData.account.address === process.env.NEXT_PUBLIC_ADMIN_PUBLIC_KEY) {
      return useAppSettingsStore.setState({ isAdmin: true })
    }
    useAppSettingsStore.setState({ isAdmin: false })
  }, [walletData])

  const isAdmin = useAppSettingsStore((state) => state.isAdmin)

  if (!walletData) {
    return (
      <main className='flex min-h-screen flex-col items-center p-24'>
        <ConnectKitButton />
      </main>
    )
  }

  if (!isAdmin) {
    return (
      <main className='flex min-h-screen flex-col items-center p-24'>
        <span>You&apos;re not an admin please return to the home page</span>
        <Link href='/'>Back to home</Link>
      </main>
    )
  }

  getDocs(collection(db, 'pending_users')).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
    })
  })

  return <main className='flex min-h-screen flex-col items-center p-24'>ADMIN</main>
}

export default Admin
