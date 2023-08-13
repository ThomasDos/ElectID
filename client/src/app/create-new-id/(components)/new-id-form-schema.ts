import { mixed, object, string } from 'yup'
const MAX_FILE_SIZE = 1000000
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const validateImageType = (value: File) => {
  console.log('VALUE >>>', value)
  if (value) {
    return SUPPORTED_FORMATS.includes(value.type)
  }
}

function newIDFormSchema() {
  return object({
    firstName: string().min(3).required('First name is required'),
    lastName: string().min(3).required('Last name is required'),
    photo: mixed<File[]>()
      .required('Photo is required')
      .test({
        message: 'Please provide a supported file type',
        test: (files) => {
          console.log('FILES >>>', files)
          if (!files?.[0]) return false
          return validateImageType(files[0])
        }
      })
      .test({
        message: 'File size is too large',
        test: (files) => {
          if (!files?.[0]) return false
          return files[0].size <= MAX_FILE_SIZE
        }
      }),
    address: string().required('Address is required')
  })
}

export default newIDFormSchema
