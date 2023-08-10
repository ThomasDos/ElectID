import styled from 'styled-components'

const StyledButtonSuccess = styled.button`
  width: fit-content;
  border-radius: 15px;
  background: linear-gradient(270deg, rgba(78, 153, 85, 0.77) 0%, #518a55 100%);
  display: inline-flex;
  padding: 17px 40px;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-family: Poppins;
  font-size: 21px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

interface ButtonSuccessProps {
  onClick?: () => void
  text: string
  className?: string
}

function ButtonSuccess({ onClick, text, className }: ButtonSuccessProps) {
  return (
    <StyledButtonSuccess onClick={onClick} className={className}>
      {text}
    </StyledButtonSuccess>
  )
}

export default ButtonSuccess
