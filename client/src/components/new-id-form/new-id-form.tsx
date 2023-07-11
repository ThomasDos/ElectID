'use client'
import { PendingUser } from '@/interfaces/pending-users'
import { db, storage } from '@/services/firebase'
import resizeImage from '@/utils/resize-image.utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
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
import { useWalletClient } from 'wagmi'
import newIDFormSchema from './new-id-form-schema'

interface FormValues {
  firstName: string
  lastName: string
  photo: File
  address: string
}

function NewIDForm() {
  const { data: walletData } = useWalletClient()
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null)
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

  useEffect(() => {
    if (!walletData?.account?.address) return

    const docRef = doc(db, 'pending_users', walletData.account.address)
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setPendingUser(doc.data() as PendingUser)
      } else {
        setPendingUser(null)
      }
    })

    setValue('address', walletData.account.address)
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

  if (!walletData) {
    return (
      <main>
        <ConnectKitButton />
      </main>
    )
  }

  if (!isEmpty(pendingUser)) {
    return (
      <div className='text-center'>
        You have already a pending application created the {new Date(pendingUser.created_at).toLocaleDateString()}, our
        agents are processing it.
      </div>
    )
  }

  return (
    <>
      <h1 className='my-10 text-xl font-bold'>Apply for your new ID</h1>
      <form onSubmit={handleSubmit((e) => onSubmit(e as any))} className='text-black flex flex-col gap-2'>
        <TextField id='outlined-basic' label='First Name' variant='outlined' {...register('firstName')} />
        {errors.firstName && <span className='text-red-800 font-bold'>{errors.firstName.message}</span>}
        <TextField id='outlined-basic' label='Last Name' variant='outlined' {...register('lastName')} />
        {errors.lastName && <span className='text-red-800 font-bold'>{errors.lastName.message}</span>}
        <Button variant='contained' component='label'>
          Upload File
          <input {...register('photo')} type='file' accept='image/*' multiple={false} hidden />
        </Button>
        {!!watch('photo')?.length && (
          <Image src={URL.createObjectURL(watch('photo')[0])} width={200} height={200} alt='user-image' />
        )}
        {errors.photo && <span className='text-red-800 font-bold'>{errors.photo.message}</span>}

        {isValid && (
          <Button variant='contained' type='submit' color='success' disabled={isSubmitting}>
            SUBMIT
          </Button>
        )}
      </form>
    </>
  )
}

export default NewIDForm
