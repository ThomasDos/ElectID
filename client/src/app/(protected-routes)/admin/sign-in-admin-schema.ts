import { object, string } from 'yup'

function signInAdminSchema() {
  return object({
    email: string().min(6).required('First name is required'),
    password: string().min(6).required('Last name is required')
  })
}

export default signInAdminSchema
