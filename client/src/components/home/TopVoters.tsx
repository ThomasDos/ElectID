import Image from 'next/image'
import SectionBoard from './SectionBoard'

function TopVoters() {
  return (
    <SectionBoard
      title='Top Voters'
      subtitle='Recognizing the Champions: Top Voters in our Decentralized Identity Voting Community'
      iconSrc='/icons/cup.svg'
      iconAlt='icon cup'>
      <Image src='/svg/temporary-top-voters-board.svg' width={1300} height={1160} alt='icon votes' />
    </SectionBoard>
  )
}

export default TopVoters
