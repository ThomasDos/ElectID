import styled from 'styled-components'

const StyledH1 = styled.h1`
  color: #333;
  font-size: 56px;
  font-weight: 800;
  line-height: 73px; /* 130.357% */
  letter-spacing: -0.56px;
  margin-bottom: 40px;
`

function H1Custom({ children, className }: { children: React.ReactNode; className?: string }) {
  return <StyledH1 className={className}>{children}</StyledH1>
}

export default H1Custom
