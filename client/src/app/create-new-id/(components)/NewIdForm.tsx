'use client'

import ButtonSuccess from '@/components/ui/ButtonSuccess'
import Input from '@/components/ui/Input'
import { db, storage } from '@/services/firebase'
import resizeImage from '@/utils/resize-image.utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { doc, setDoc } from 'firebase/firestore/lite'
import { ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import { useWalletClient } from 'wagmi'
import UploadUserImage from './UploadUserImage'
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

const StyledH2 = styled.h2`
  color: #2b2f32;
  font-size: 26.486px;
  font-weight: 500;
  margin-bottom: 40px;
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

  console.log('isValid', isValid)
  console.log('errors', errors)
  console.log('IMAGE', watch('photo'))
  console.log('firstName', watch('firstName'))
  console.log('lastName', watch('photo'))
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
        <StyledH2>Register your ID</StyledH2>
        <Input placeholder='John' id='firstName' labelName='firstName' label='First Name' {...register('firstName')} />
        {errors.firstName && <span className='text-red-800 font-bold'>{errors.firstName.message}</span>}
        <Input id='lastName' labelName='lastName' label='Last Name' placeholder='Doe' {...register('lastName')} />
        {errors.lastName && <span className='text-red-800 font-bold'>{errors.lastName.message}</span>}
        <UploadUserImage setPhoto={(pic: File[]) => setValue('photo', pic)} />

        {errors.photo && <span className='text-red-800 font-bold'>{errors.photo.message}</span>}
        <ButtonSuccess disabled={isSubmitting} className='w-full'>
          SUBMIT
        </ButtonSuccess>
      </form>
    </StyledFormCard>
  )
}

export default NewIdForm
