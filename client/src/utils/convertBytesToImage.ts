function convertBytesToImage(bytes: ArrayBuffer) {
  const imageBytes = Buffer.from(bytes).toString('base64')
  const datajpg = 'data:image/jpg;base64,' + imageBytes

  return datajpg
}

export default convertBytesToImage
