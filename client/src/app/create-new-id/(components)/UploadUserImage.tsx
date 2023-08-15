import ButtonError from '@/components/ui/ButtonError'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ImageUploading from 'react-images-uploading'
import DragImageBox from './DragImageBox'

function UploadUserImage() {
  const [userImage, setUserImage] = useState('')
  const maxNumber = 69
  const { control, resetField } = useFormContext()

  const handleRemove = () => {
    resetField('photo')
    setUserImage('')
  }

  return (
    <div className='w-full'>
      <Controller
        control={control}
        name='photo'
        render={({ field: { onChange, ...field } }) => (
          <ImageUploading
            onChange={(imageList) => {
              onChange([imageList[0].file] as File[])
              setUserImage(imageList[0].dataURL as string)
            }}
            {...field}
            maxNumber={maxNumber}>
            {({ imageList, onImageUpload, isDragging, dragProps }) => (
              <div className='w-full'>
                {!imageList?.[0] && (
                  <div
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    className='flex justify-center my-4 cursor-pointer'>
                    <DragImageBox />
                  </div>
                )}

                {userImage && (
                  <div className='w-full flex flex-col items-center'>
                    <Image src={userImage as string} alt='User image to upload' width='200' height='200' />
                    <ButtonError onClick={handleRemove} className='my-5 w-full'>
                      Remove Image
                    </ButtonError>
                  </div>
                )}
              </div>
            )}
          </ImageUploading>
        )}
      />
    </div>
  )
}

export default UploadUserImage
