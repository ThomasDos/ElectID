import Image from 'next/image'
import styled from 'styled-components'

const StyledDragImageBox = styled.div`
  display: inline-flex;
  padding: 48.157px 79.007px 46.826px 79.458px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12.039px;
  border-radius: 9.631px;
  border: 1.204px dashed #868686;
  background: var(--input-default-background, rgba(239, 241, 249, 0.6));
  width: 100%;
`

function DragImageBox() {
  return (
    <StyledDragImageBox>
      <Image src='/icons/upload.svg' width={40} alt='Upload Icon' height={40} />
      <span className='text-base font-medium text-gray-500'>
        Drop Image here or <span className='text-primary font-bold'>Browse files</span>
      </span>
    </StyledDragImageBox>
  )
}

export default DragImageBox
