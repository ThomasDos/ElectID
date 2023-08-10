'use client'

import Image from 'next/image'
import styled from 'styled-components'

const StyledH1 = styled.h1`
  color: #333;
  font-family: Poppins;
  font-size: 56px;
  font-style: normal;
  font-weight: 800;
  line-height: 73px; /* 130.357% */
  letter-spacing: -0.56px;
  width: 50%;
`

export default function Home() {
  return (
    <main className='flex flex-col items-center px-10'>
      <div className='flex justify-center '>
        <div className='flex flex-col pt-10'>
          <StyledH1>Decentralized Voting for a Trustworthy Democracy</StyledH1>
          <span>
            Welcome to our platform where cutting-edge technology meets democratic participation. Explore the world of
            decentralized identity voting.
          </span>
          <button>Get Started</button>
        </div>
        <Image src='/svg/home-passport-landing.svg' alt='' width={750} height={750} />
      </div>
    </main>
  )
}
