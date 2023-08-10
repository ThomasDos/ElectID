'use client'

import ButtonSuccess from '@/components/ui/ButtonSuccess'
import Image from 'next/image'
import styled from 'styled-components'

const StyledH1Custom = styled.h1`
  color: #333;
  font-size: 56px;
  font-weight: 800;
  line-height: 73px; /* 130.357% */
  letter-spacing: -0.56px;
`

const StyledH2Custom = styled.h2`
  color: #333;
  font-size: 20px;
  line-height: 33px; /* 165% */
`

export default function Home() {
  return (
    <main className='flex flex-col items-center px-40 w-screen'>
      <div className='flex'>
        <div className='flex flex-col flex-[2] justify-center '>
          <StyledH1Custom>Decentralized Voting for a Trustworthy Democracy</StyledH1Custom>
          <StyledH2Custom>
            Welcome to our platform where cutting-edge technology meets democratic participation. Explore the world of
            decentralized identity voting.
          </StyledH2Custom>
          <ButtonSuccess text='Get Started' className='mt-10' />
        </div>
        <div className='flex-[3] flex justify-end'>
          <Image className='' src='/svg/home-passport-landing.svg' alt='' width={750} height={750} />
        </div>
      </div>
    </main>
  )
}
