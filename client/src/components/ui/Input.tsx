import styled from 'styled-components'

const StyledInput = styled.input`
  border: 1px solid #dde2e5;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 24px;
  color: #333;
  font-weight: 500;
  background: #fff;
  box-shadow: 0px 4.81561803817749px 4.81561803817749px 0px rgba(85, 139, 86, 0.24);
  &:focus {
    outline: none;
    border: 1px solid #333;
  }
`

function Input(props: any) {
  return (
    <>
      {props.label && (
        <label htmlFor={props.labelName} className='mr-auto'>
          {props.label}
        </label>
      )}
      <StyledInput {...props} />
    </>
  )
}

export default Input
