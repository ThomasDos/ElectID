import FileResizer from 'react-image-file-resizer'

function resizeImage(file: File) {
  return new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      300,
      300,
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
