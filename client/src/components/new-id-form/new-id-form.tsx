'use client'
import { db, storage } from '@/services/firebase'
import { PendingUser } from '@/types/pending-users'
import resizeImage from '@/utils/resize-image.utils'
import { yupResolver } from '@hookform/resolvers/yup'
import TextField from '@mui/material/TextField'
import { ConnectKitButton } from 'connectkit'
import { doc, getDoc, setDoc } from 'firebase/firestore/lite'
import { ref, uploadBytes } from 'firebase/storage'
import { isEmpty } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import { useWalletClient } from 'wagmi'
import ButtonSuccess from '../ui/ButtonSuccess'
import Dots from '../ui/Dots'
import newIDFormSchema from './new-id-form-schema'

const StyledH1Form = styled.h1`
  color: #333;
  font-size: 56px;
  font-weight: 800;
  line-height: 73px; /* 130.357% */
  letter-spacing: -0.56px;
  margin-bottom: 40px;
`

const StyledH2Form = styled.h2`
  color: #333;
  font-size: 20px;
  line-height: 33px; /* 165% */
  margin-bottom: 40px;
`

const StyledH1Custom = styled.h1`
  color: #626262;
  text-align: center;
  font-size: 32.315px;
  line-height: 61.803px; /* 191.252% */
  letter-spacing: -0.323px;
`

const StyledFormCard = styled.div`
  border-radius: 24.078px;
  border: 1.204px solid var(--grey, #dde2e5);
  background: #fff;
  box-shadow: 0px 4.81561803817749px 4.81561803817749px 0px rgba(85, 139, 86, 0.24);
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px;
`

interface FormValues {
  firstName: string
  lastName: string
  photo: File
  address: string
}

function NewIDForm() {
  const { data: walletData } = useWalletClient()
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null)
  const [dbIsLoading, setDbIsLoading] = useState(true)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: yupResolver(newIDFormSchema())
  })

  console.log('watch(photo)', watch('photo'))

  useEffect(() => {
    if (!walletData?.account?.address) return setDbIsLoading(false)

    const docRef = doc(db, 'pending_users', walletData.account.address)
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setPendingUser(doc.data() as PendingUser)
      } else {
        setPendingUser(null)
      }
    })

    setValue('address', walletData.account.address)
    setDbIsLoading(false)
  }, [walletData])

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

  if (dbIsLoading) {
    return (
      <div className='flex items-center justify-center h-[80vh]'>
        <Dots dotsColor='var(--color-primary)' />
      </div>
    )
  }

  if (!walletData) {
    return (
      <div className='flex flex-col items-center justify-center gap-6'>
        <Image src='/svg/safe-user.svg' width={500} height={450} alt='safe and wallet' />
        <StyledH1Custom>Please connect your wallet</StyledH1Custom>
        <ConnectKitButton theme='minimal' />
      </div>
    )
  }

  if (!isEmpty(pendingUser)) {
    return (
      <div className='flex flex-col items-center justify-center gap-6'>
        <Image src='/svg/pending-application.svg' width={600} height={540} alt='pending application hourglass' />
        <StyledH1Custom>
          You have already a pending application created the{' '}
          <span className='text-primary font-bold'>{new Date(pendingUser.created_at).toLocaleDateString()}</span>, our
          agents are processing it.
        </StyledH1Custom>
      </div>
    )
  }

  return (
    <div className='flex justify-between w-full px-60 gap-10'>
      <div className='flex flex-col flex-1'>
        <StyledH1Form>Request for a new ID card</StyledH1Form>
        <StyledH2Form>
          Lorem ipsum dolor sit amet consectetur. Imperdiet libero diam nunc dictum mattis in. Nec amet molestie at
          quam.
        </StyledH2Form>
        <Image src='/svg/id-card.svg' width={500} height={400} alt='identity card' />
      </div>

      <StyledFormCard>
        <form
          onSubmit={handleSubmit((e) => onSubmit(e as any))}
          className='text-black flex flex-col gap-2 items-center w-full'>
          <TextField id='outlined-basic' label='First Name' variant='outlined' {...register('firstName')} />
          {errors.firstName && <span className='text-red-800 font-bold'>{errors.firstName.message}</span>}
          <TextField id='outlined-basic' label='Last Name' variant='outlined' {...register('lastName')} />
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
    </div>
  )
}

export default NewIDForm
