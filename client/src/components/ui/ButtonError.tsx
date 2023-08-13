import styled from 'styled-components'

const StyledButtonError = styled.button`
  border-radius: 15px;
  background: linear-gradient(270deg, #eb6c7b 0%, #de4053 100%);
  display: inline-flex;
  justify-content: center;
  padding: 17px 40px;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 21px;
  font-weight: 600;
  &:hover {
    transform: translateY(-2px);
    box-shadow: -5px 9px 0px -2px #eb6c7b8b;
  }
`

interface ButtonErrorProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

function ButtonError({ onClick, children, className, disabled }: ButtonErrorProps) {
  return (
    <StyledButtonError onClick={onClick} className={className} disabled={disabled}>
      {children}
    </StyledButtonError>
  )
}

export default ButtonError
