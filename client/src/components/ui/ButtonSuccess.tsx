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
  &:hover {
    transform: translateY(-2px);
    box-shadow: -5px 9px 0px -2px rgba(83, 139, 86, 0.49);
  }
`

interface ButtonSuccessProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

function ButtonSuccess({ onClick, children, className, disabled }: ButtonSuccessProps) {
  return (
    <StyledButtonSuccess onClick={onClick} className={className} disabled={disabled}>
      {children}
    </StyledButtonSuccess>
  )
}

export default ButtonSuccess
