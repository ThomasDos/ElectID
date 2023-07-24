function convertBlobToImage(blob: Blob) {
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)

  return imageUrl
}

export default convertBlobToImage
