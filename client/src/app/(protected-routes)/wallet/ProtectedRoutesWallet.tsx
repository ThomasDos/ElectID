'use client'

import { ConnectKitButton } from 'connectkit'
import Image from 'next/image'
import styled from 'styled-components'
import { useWalletClient } from 'wagmi'

const StyledH1Custom = styled.h1`
  color: #626262;
  text-align: center;
  font-size: 32.315px;
  line-height: 61.803px; /* 191.252% */
  letter-spacing: -0.323px;
`

function ProtectedRoutesWallet({ children }: { children: React.ReactNode }) {
  const { data: walletData } = useWalletClient()

  if (!walletData) {
    return (
      <div className='flex flex-col items-center justify-center gap-6'>
        <Image src='/svg/safe-user.svg' width={500} height={450} alt='safe and wallet' />
        <StyledH1Custom>Please connect your wallet</StyledH1Custom>
        <ConnectKitButton theme='minimal' />
      </div>
    )
  }
  return <div>{children}</div>
}

export default ProtectedRoutesWallet
