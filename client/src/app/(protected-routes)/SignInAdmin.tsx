import { auth } from '@/services/firebase'
import { useAppSettingsStore } from '@/store/app-settings'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import signInAdminSchema from './sign-in-admin-schema'

function SignInAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: yupResolver(signInAdminSchema())
  })
  const handleSignIn = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        useAppSettingsStore.setState({ isAdmin: true })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }
  return (
    <main className='flex flex-col text-center'>
      <h1 className='my-10 text-xl font-bold'>Apply for your new ID</h1>
      <form
        onSubmit={handleSubmit((data) => handleSignIn(data.email, data.password))}
        className='text-black flex flex-col gap-2 items-center'>
        <TextField id='outlined-basic' label='Email' variant='outlined' {...register('email')} />
        {errors.email && <span className='text-red-800 font-bold'>{errors.email.message}</span>}
        <TextField id='outlined-basic' label='Password' variant='outlined' type='password' {...register('password')} />
        {errors.password && <span className='text-red-800 font-bold'>{errors.password.message}</span>}

        {isValid && (
          <Button variant='contained' type='submit' color='success' disabled={isSubmitting}>
            SUBMIT
          </Button>
        )}
      </form>
    </main>
  )
}

export default SignInAdmin