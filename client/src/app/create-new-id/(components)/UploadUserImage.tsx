import ButtonError from '@/components/ui/ButtonError'
import Image from 'next/image'
import { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import DragImageBox from './DragImageBox'

interface UploadUserImageProps {
  setPhoto: (pic: File[]) => void
}

function UploadUserImage({ setPhoto }: UploadUserImageProps) {
  const [images, setImages] = useState([])
  const maxNumber = 69

  const onChange = (imageList: ImageListType, onImageUpdate: any) => {
    console.log('onImageUpdate:', onImageUpdate)
    console.log('imageList:', imageList)
    setImages(imageList as never[])
    setPhoto([imageList[0].file] as File[])
  }

  const handleRemove = (onImageRemove: (index: number) => void) => {
    setPhoto([])
    setImages([])
    onImageRemove(0)
  }

  return (
    <div className='w-full'>
      <ImageUploading value={images} onChange={onChange} maxNumber={maxNumber}>
        {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
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

            {imageList?.[0] && (
              <div className='w-full flex flex-col items-center'>
                <Image src={imageList[0].dataURL as string} alt='User image to upload' width='200' height='200' />
                <ButtonError onClick={() => handleRemove(onImageRemove)} className='my-5 w-full'>
                  Remove Image
                </ButtonError>
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default UploadUserImage
