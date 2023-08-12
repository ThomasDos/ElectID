import Image from 'next/image'
import SectionBoard from './SectionBoard'

function Votes() {
  return (
    <SectionBoard
      title='Votes'
      subtitle='Explore the world of decentralized identity voting and experience a new era of secure, transparent, and inclusive elections.'
      iconSrc='/icons/votes.svg'
      iconAlt='icon votes'>
      <Image src='/svg/temporary-votes-board.svg' width={1300} height={1160} alt='icon votes' />
    </SectionBoard>
  )
}

export default Votes
