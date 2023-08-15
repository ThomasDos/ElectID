import styled from 'styled-components'

const StyledH2 = styled.h2`
  color: #333;
  font-size: 20px;
  line-height: 33px; /* 165% */
  margin-bottom: 40px;
`

function H3Custom({ children, className }: { children: React.ReactNode; className?: string }) {
  return <StyledH2 className={className}>{children}</StyledH2>
}

export default H3Custom
