'use client'

import ButtonSuccess from '@/components/ui/ButtonSuccess'
import Input from '@/components/ui/Input'
import { db, storage } from '@/services/firebase'
import resizeImage from '@/utils/resize-image.utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { doc, setDoc } from 'firebase/firestore/lite'
import { ref, uploadBytes } from 'firebase/storage'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import { useWalletClient } from 'wagmi'
import newIDFormSchema from './new-id-form-schema'

const StyledFormCard = styled.div`
  border-radius: 24.078px;
  border: 1.204px solid var(--grey, #dde2e5);
  background: #fff;
  box-shadow: 0px 4.81561803817749px 4.81561803817749px 0px rgba(85, 139, 86, 0.24);
  display: flex;
  flex-direction: column;
  padding: 40px;
  min-width: 35vw;
`

interface FormValues {
  firstName: string
  lastName: string
  photo: File
  address: string
}

function NewIdForm() {
  const router = useRouter()
  const { data: walletData } = useWalletClient()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: yupResolver(newIDFormSchema())
  })

  useEffect(() => {
    if (!walletData?.account?.address) return
    setValue('address', walletData.account.address)
  }, [walletData?.account?.address])

  const onSubmit = async (data: FormValues) => {
    //@ts-ignore
    const resizedImage = await resizeImage(data.photo[0] as File)
    const storageRef = ref(storage, data.address)
    if (resizedImage) {
      uploadBytes(storageRef, resizedImage as Blob).then(() => {
        //TODO: reload page
      })

      try {
        await setDoc(doc(db, 'pending_users', data.address), {
          firstname: data.firstName,
          lastname: data.lastName,
          public_key: data.address,
          created_at: new Date().toISOString()
        })

        toast.success('Your application is successfully registered')
        router.push('/')
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }
  }

  return (
    <StyledFormCard>
      <form
        onSubmit={handleSubmit((e) => onSubmit(e as any))}
        className='text-black flex flex-col gap-2 items-center w-full'>
        <Input placeholder='John' id='firstname' labelName='firstname' label='First Name' {...register('firstName')} />
        {errors.firstName && <span className='text-red-800 font-bold'>{errors.firstName.message}</span>}
        <Input id='lastname' labelName='lastname' label='Last Name' placeholder='Doe' {...register('lastName')} />
        {errors.lastName && <span className='text-red-800 font-bold'>{errors.lastName.message}</span>}
        <ButtonSuccess>
          Click to upload your photo
          <div className='absolute'>
            <input
              {...register('photo')}
              type='file'
              accept='image/*'
              multiple={false}
              style={{ opacity: 0, position: 'relative', cursor: 'pointer' }}
            />
          </div>
        </ButtonSuccess>
        {!!watch('photo')?.length && (
          <Image src={URL.createObjectURL(watch('photo')[0])} width={200} height={200} alt='user-image' />
        )}
        {errors.photo && <span className='text-red-800 font-bold'>{errors.photo.message}</span>}

        {isValid && <ButtonSuccess disabled={isSubmitting}>SUBMIT</ButtonSuccess>}
      </form>
    </StyledFormCard>
  )
}

export default NewIdForm
