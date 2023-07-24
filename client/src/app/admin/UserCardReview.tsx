import { PendingUser } from '@/interfaces/pending-users'
import { db, storage } from '@/services/firebase'
import uploadImageIpfsFromBlob from '@/services/web3-storage/upload-image-ipfs-from-blob'
import uploadMetadataIpfs from '@/services/web3-storage/upload-metadata-ipfs'
import { makeStorageClient } from '@/services/web3-storage/web3-storage.client'
import convertBlobToImage from '@/utils/convert-blob-to-image'
import { Box, Modal, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { deleteDoc, doc } from 'firebase/firestore/lite'
import { deleteObject, getBlob, ref } from 'firebase/storage'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components'

const StyledUserCardContainer = styled.div`
  border-radius: 20px;
  background-color: #7895cb;
`

const StyledRowTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #1f2937;
`

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#4a55a2',
  boxShadow: 24,
  p: 4
}

interface PendingUserCardReviewProps {
  pendingUser: PendingUser
  removeUserFromPendingUsers: (publicKey: PendingUser['public_key']) => void
}

const initialConfirmationModal = { show: false, title: '', description: '', action: () => {} }

function PendingUserCardReview({ pendingUser, removeUserFromPendingUsers }: PendingUserCardReviewProps) {
  const [userImage, setUserImage] = useState('')
  const [userImageBlob, setUserImageBlob] = useState<Blob | null>(null)
  const [
    { show: showModal, action: actionModal, description: descriptionModal, title: titleModal },
    setConfirmationModal
  ] = useState(initialConfirmationModal)

  const { firstname, lastname, public_key, created_at } = pendingUser

  const storageRef = ref(storage, public_key)

  const removeUser = async (publicKey: PendingUser['public_key']) => {
    const deleteFirestore = deleteDoc(doc(db, 'pending_users', publicKey))
    toast.promise(deleteFirestore, {
      loading: 'Loading',
      success: 'User removed on firestore',
      error: 'Error when fetching'
    })
    const bucketImageRef = ref(storage, publicKey)
    const deleteStorage = deleteObject(bucketImageRef)
    toast.promise(deleteStorage, {
      loading: 'Loading',
      success: 'User removed on storage',
      error: 'Error when fetching'
    })

    removeUserFromPendingUsers(publicKey)
  }

  const createUser = async (publicKey: PendingUser['public_key']) => {
    if (!userImageBlob || !publicKey) return
    const cid = await uploadImageIpfsFromBlob(userImageBlob, publicKey)
    console.log('cid:', cid)
  }

  useEffect(() => {
    getBlob(storageRef)
      .then((blob) => {
        console.log('blob:', blob)
        setUserImageBlob(blob)
        const imageConverted = convertBlobToImage(blob)
        setUserImage(imageConverted)
      })
      .catch((error) => {
        setUserImage('')
      })

    async function test() {
      const client = makeStorageClient()
      const res = await client.get('bafybeibh3u4pmlwg3wh2kjqp6omvuvswiahbzvwrdyjgvhjy7iv4h5djbm')
      console.log('res:', res)
      const files = await res?.files()
      console.log('res:', files?.[0])

      const imageConverted = convertBlobToImage(files?.[0] as Blob)
      console.log('imageConverted 2:', imageConverted)
    }

    test()
  }, [])

  const handleResetModalState = () => {
    setConfirmationModal(initialConfirmationModal)
  }

  const uploadMetadataUser = async (publicKey: PendingUser['public_key']) => {
    const cidURI = uploadMetadataIpfs('bafybeibh3u4pmlwg3wh2kjqp6omvuvswiahbzvwrdyjgvhjy7iv4h5djbm', pendingUser)
    console.log('cidURI:', cidURI)
  }

  return (
    <>
      <StyledUserCardContainer className='flex flex-col p-2 sm:px-4 sm:py-6 shadow-md hover:shadow-lg hover:shadow-white shadow-white'>
        <div className='flex items-center gap-2'>
          <Image
            src={userImage}
            width={200}
            height={200}
            alt='user picture'
            className='h-[100px] w-[100px] sm:h-[200px] sm:w-[200px]'
          />
          <div className='flex flex-col gap-2 text-sm'>
            <div>
              <StyledRowTitle>Public key:</StyledRowTitle>
              <div>{public_key}</div>
            </div>
            <div>
              <StyledRowTitle>Created at:</StyledRowTitle>
              <div>{new Date(created_at).toLocaleString()}</div>
            </div>
            <div>
              <StyledRowTitle>First name:</StyledRowTitle>
              <div>{firstname}</div>
            </div>
            <div>
              <StyledRowTitle>Last name:</StyledRowTitle>
              <div>{lastname}</div>
            </div>
          </div>
        </div>
        <div className='flex justify-center gap-6 py-4'>
          <Button
            variant='contained'
            color='error'
            onClick={() =>
              setConfirmationModal({
                show: true,
                title: 'Remove user : ',
                description: 'Are you sure you want to remove this user?',
                action: () => removeUser(public_key)
              })
            }>
            Remove
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={() =>
              setConfirmationModal({
                show: true,
                title: 'Create user : ',
                description: 'Are you sure you want to create this user?',
                action: () => createUser(public_key)
              })
            }>
            Validate
          </Button>
          <Button variant='contained' color='success' onClick={() => uploadMetadataUser(pendingUser.public_key)}>
            Upload
          </Button>
        </div>
      </StyledUserCardContainer>

      <Modal
        open={showModal}
        onClose={handleResetModalState}
        aria-labelledby={titleModal}
        aria-describedby={descriptionModal}
        className='flex justify-center items-center'>
        <Box sx={modalStyle}>
          <Typography id='modal-modal-title' variant='h3' component='h2'>
            {titleModal}
          </Typography>
          <div className='my-2'>
            <Typography id='modal-modal-title' variant='h4' component='h3'>
              {firstname} {lastname}
            </Typography>
          </div>
          <Button variant='contained' color='success' sx={{ fontSize: '12px' }} onClick={actionModal}>
            {descriptionModal}
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default PendingUserCardReview
