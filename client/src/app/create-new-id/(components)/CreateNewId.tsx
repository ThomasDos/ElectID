'use client'

import Dots from '@/components/ui/Dots'
import { db } from '@/services/firebase'
import { PendingUser } from '@/types/pending-users'
import { doc, getDoc } from 'firebase/firestore/lite'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWalletClient } from 'wagmi'
import NewIdForm from './NewIdForm'

const StyledH1Form = styled.h1`
  color: #333;
  font-size: 56px;
  font-weight: 800;
  line-height: 73px; /* 130.357% */
  letter-spacing: -0.56px;
  margin-bottom: 20px;
`

const StyledH2Form = styled.h2`
  color: #333;
  font-size: 20px;
  line-height: 33px; /* 165% */
  margin-bottom: 20px;
`

const StyledH1Custom = styled.h1`
  color: #626262;
  text-align: center;
  font-size: 32.315px;
  line-height: 61.803px; /* 191.252% */
  letter-spacing: -0.323px;
`

function CreateNewId() {
  const { data: walletData } = useWalletClient()
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null)
  const [dbIsLoading, setDbIsLoading] = useState(true)

  useEffect(() => {
    if (!walletData?.account?.address) return setDbIsLoading(false)

    const docRef = doc(db, 'pending_users', walletData.account.address)
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setPendingUser(doc.data() as PendingUser)
      } else {
        setPendingUser(null)
      }
    })

    setDbIsLoading(false)
  }, [walletData])

  if (dbIsLoading) {
    return (
      <div className='flex items-center justify-center h-[80vh]  flex-col'>
        <Dots dotsColor='var(--color-primary)' />
      </div>
    )
  }

  if (!isEmpty(pendingUser)) {
    return (
      <div className='flex flex-col items-center justify-center gap-6 h-full'>
        <Image src='/svg/pending-application.svg' width={600} height={540} alt='pending application hourglass' />
        <StyledH1Custom>
          You have already a pending application created the{' '}
          <span className='text-primary font-bold'>{new Date(pendingUser.created_at).toLocaleDateString()}</span>, our
          agents are processing it.
        </StyledH1Custom>
      </div>
    )
  }

  return (
    <div className='flex justify-between w-full px-60 gap-10 items-center'>
      <div className='flex flex-col flex-1'>
        <StyledH1Form>Request for a new ID card</StyledH1Form>
        <StyledH2Form>
          Lorem ipsum dolor sit amet consectetur. Imperdiet libero diam nunc dictum mattis in. Nec amet molestie at
          quam.
        </StyledH2Form>
        <Image src='/svg/id-card.svg' width={500} height={400} alt='identity card' />
      </div>

      <NewIdForm />
    </div>
  )
}

export default CreateNewId
