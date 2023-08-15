import styled from 'styled-components'

const StyledH2 = styled.h2`
  color: #333;
  font-size: 42px;
  font-weight: 600;
  line-height: 64px; /* 152.381% */
`

function H2Custom({ children, className }: { children: React.ReactNode; className?: string }) {
  return <StyledH2 className={className}>{children}</StyledH2>
}

export default H2Custom
