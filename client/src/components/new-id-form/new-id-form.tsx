import { db, storage } from '@/services/firebase'
import resizeImage from '@/utils/resize-image.utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { ConnectKitButton } from 'connectkit'
import { addDoc, collection } from 'firebase/firestore/lite'
import { ref, uploadBytes } from 'firebase/storage'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(newIDFormSchema()),
    defaultValues: { address: walletData?.account.address, photo: '' }
  })

  useEffect(() => {
    if (!walletData?.account?.address) return
    setValue('address', walletData?.account.address)
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
        const docRef = await addDoc(collection(db, 'pending_users'), {
          firstname: data.firstName,
          lastname: data.lastName,
          public_key: data.address,
          created_at: new Date().toISOString()
        })

        console.log('Document written with ID: ', docRef.id)
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    }
  }

  if (!walletData) {
    return (
      <main className='flex min-h-screen flex-col items-center  p-24'>
        <ConnectKitButton />
      </main>
    )
  }

  return (
    <form onSubmit={handleSubmit((e) => onSubmit(e as FormValues))} className='text-black flex flex-col gap-2'>
      <input {...register('firstName')} placeholder='Type your first name' />
      {errors.firstName && <span className='text-red-800 font-bold'>{errors.firstName.message}</span>}
      <input {...register('lastName')} placeholder='Type your last name' />
      {errors.lastName && <span className='text-red-800 font-bold'>{errors.lastName.message}</span>}
      <input {...register('photo')} type='file' accept='image/*' multiple={false} />
      {errors.photo && <span className='text-red-800 font-bold'>{errors.photo.message}</span>}

      {!Object.keys(errors).length && <button type='submit'>SUBMIT</button>}
    </form>
  )
}

export default NewIDForm
