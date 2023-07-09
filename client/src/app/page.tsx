'use client'
import NewIDForm from '@/components/new-id-form/new-id-form'
import UserImage from '@/components/user-profile/user-image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ElectID',
  description: 'DAO for the future of identity'
}
export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center  p-24'>
      <UserImage />
      <NewIDForm />
    </main>
  )
}
