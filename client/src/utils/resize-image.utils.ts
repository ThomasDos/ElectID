import FileResizer from 'react-image-file-resizer'

function resizeImage(file: File) {
  return new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      200,
      200,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'blob'
    )
  })
}

export default resizeImage
