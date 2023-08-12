import Image from 'next/image'
import styled from 'styled-components'

const StyledH3Custom = styled.h3`
  color: #333;
  font-size: 42px;
  font-weight: 600;
  line-height: 64px; /* 152.381% */
`

const StyledH4Custom = styled.h4`
  color: #676767;
  font-size: 24px;
  line-height: 37px; /* 154.167% */
  width: 50%;
  margin-bottom: 20px;
`

interface SectionBoardProps {
  title: string
  subtitle: string
  children: React.ReactNode
  iconSrc: string
  iconAlt: string
}

function SectionBoard({ title, subtitle, children, iconSrc, iconAlt }: SectionBoardProps) {
  return (
    <div className='flex flex-col my-20 w-full'>
      <div className='flex gap-2'>
        <StyledH3Custom>{title}</StyledH3Custom>
        <Image src={iconSrc} width={45} height={45} alt={iconAlt} />
      </div>
      <StyledH4Custom>{subtitle}</StyledH4Custom>

      <div className='flex justify-center'>{children}</div>
    </div>
  )
}

export default SectionBoard
