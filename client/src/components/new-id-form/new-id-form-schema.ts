import { mixed, object, string } from 'yup'
const MAX_FILE_SIZE = 1000000
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const validateImageType = (value: File) => {
  if (value) {
    return SUPPORTED_FORMATS.includes(value.type)
  }
}

function newIDFormSchema() {
  return object({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    photo: mixed()
      .required('Photo is required')
      .test({
        message: 'Please provide a supported file type',
        test: (files) => {
          //@ts-ignore
          return validateImageType(files[0] as File)
        }
      })
      .test({
        message: 'File size is too large',
        test: (files) => {
          //@ts-ignore
          return files[0].size <= MAX_FILE_SIZE
        }
      }),
    address: string().required('Address is required')
  })
}

export default newIDFormSchema
