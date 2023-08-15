import { Controller, useFormContext } from 'react-hook-form'
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

interface InputProps {
  id: string
  label?: string
  labelName?: string
  placeholder?: string
}

function Input({ id, label, labelName, placeholder }: InputProps) {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={id}
      render={({ field }) => (
        <>
          {label && <StyledLabel htmlFor={labelName}>{label}</StyledLabel>}

          <StyledInput {...field} placeholder={placeholder} />
        </>
      )}
    />
  )
}

export default Input
