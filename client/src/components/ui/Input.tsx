import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  display: flex;
  height: 62.603px;
  padding: 9.631px 19.262px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12.039px;
  flex-shrink: 0;
  border-radius: 9.631px;
  background: rgba(239, 241, 249, 0.6);
`

const StyledLabel = styled.label`
  color: #5e6366;
  font-size: 14.447px;
  font-weight: 500;
  margin-right: auto;
`

function Input(props: any) {
  return (
    <>
      {props.label && <StyledLabel htmlFor={props.labelName}>{props.label}</StyledLabel>}
      <StyledInput {...props} />
    </>
  )
}

export default Input
