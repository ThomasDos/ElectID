'use client'

import TopVoters from '@/components/home/TopVoters'
import Votes from '@/components/home/Votes'
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
    <main className='flex flex-col items-center px-40'>
      <div className='flex justify-center py-8'>
        <div className='flex flex-col justify-center w-3/5 pr-4'>
          <StyledH1Custom>Decentralized Voting for a Trustworthy Democracy</StyledH1Custom>
          <StyledH2Custom>
            Welcome to our platform where cutting-edge technology meets democratic participation. Explore the world of
            decentralized identity voting.
          </StyledH2Custom>
          <ButtonSuccess className='mt-10 w-max'>Get Started</ButtonSuccess>
        </div>
        <div className='flex justify-end'>
          <Image src='/svg/home-passport-landing.svg' alt='' width={750} height={750} />
        </div>
      </div>

      <Votes />
      <TopVoters />
    </main>
  )
}
