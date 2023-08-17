import ButtonError from '@/components/ui/ButtonError'
import ButtonSuccess from '@/components/ui/ButtonSuccess'
import Dots from '@/components/ui/Dots'
import viemClient from '@/services/blockchain/create-viem-client'
import uploadMetadataAndMintNft from '@/services/blockchain/upload-metadata-and-mint-nft'
import { db, storage } from '@/services/firebase'
import { PendingUser } from '@/types/pending-users'
import convertBlobToImage from '@/utils/convert-blob-to-image'
import { Box, Modal, Typography } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore/lite'
import { deleteObject, getBlob, ref } from 'firebase/storage'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components'

const StyledUserCardContainer = styled.div`
  border-radius: 20px;
  background-color: #f8f8f8;
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

interface UserCardReviewProps {
  pendingUser: PendingUser
  removeUserFromPendingUsers: (publicKey: PendingUser['public_key']) => void
}

const initialConfirmationModal = { show: false, title: '', description: '', action: () => {} }

function UserCardReview({ pendingUser, removeUserFromPendingUsers }: UserCardReviewProps) {
  const [userImage, setUserImage] = useState('')
  const [mintIsLoading, setMintIsLoading] = useState(false)
  const [userImageBlob, setUserImageBlob] = useState<Blob | null>(null)
  const [
    { show: showModal, action: actionModal, description: descriptionModal, title: titleModal },
    setConfirmationModal
  ] = useState(initialConfirmationModal)

  const { firstname, lastname, public_key, created_at } = pendingUser

  const storageRef = ref(storage, public_key)

  const removeUser = async (publicKey: PendingUser['public_key']) => {
    handleResetModalState()
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

  const createUser = async (user: PendingUser) => {
    handleResetModalState()
    setMintIsLoading(true)
    if (!userImageBlob || !user || !window) return
    const hash = await uploadMetadataAndMintNft({ userImageBlob, user })
    const publicKey = user.public_key
    if (!hash) return
    const transaction = await viemClient.waitForTransactionReceipt({
      hash
    })

    const bucketImageRef = ref(storage, publicKey)
    const deleteStorage = deleteObject(bucketImageRef)
    toast.promise(deleteStorage, {
      loading: 'Loading',
      success: 'User was created successfully ' + transaction.transactionHash,
      error: 'Error when deleting user from DB'
    })

    removeUserFromPendingUsers(publicKey)

    setMintIsLoading(false)
  }

  useEffect(() => {
    getBlob(storageRef)
      .then((blob) => {
        setUserImageBlob(blob)
        const imageConverted = convertBlobToImage(blob)
        setUserImage(imageConverted)
      })
      .catch(() => {
        setUserImage('')
      })
  }, [])

  const handleResetModalState = () => {
    setConfirmationModal(initialConfirmationModal)
  }

  return (
    <>
      <StyledUserCardContainer className='flex flex-col shadow-md hover:shadow-lg hover:shadow-white shadow-white'>
        <div className=''>
          <Image className='w-full' src='/svg/user-card-header.svg' width={670} height={140} alt='viem logo' />
        </div>
        <div className='flex items-center gap-10 px-10'>
          {userImage && (
            <Image
              src={userImage}
              width={200}
              height={200}
              alt='user picture'
              className='h-[100px] w-[100px] sm:h-[200px] sm:w-[200px] rounded-full p-1 border-8	border-[#9EC6A2]'
            />
          )}
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
          <ButtonError
            onClick={() =>
              !mintIsLoading &&
              setConfirmationModal({
                show: true,
                title: 'Remove user : ',
                description: 'Are you sure you want to remove this user?',
                action: () => removeUser(public_key)
              })
            }>
            {mintIsLoading ? <Dots /> : 'Remove'}
          </ButtonError>
          <ButtonSuccess
            onClick={() =>
              !mintIsLoading &&
              setConfirmationModal({
                show: true,
                title: 'Create user : ',
                description: 'Are you sure you want to create this user?',
                action: () => createUser(pendingUser)
              })
            }>
            {mintIsLoading ? <Dots /> : 'Validate'}
          </ButtonSuccess>
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
          <ButtonSuccess onClick={actionModal}>{descriptionModal}</ButtonSuccess>
        </Box>
      </Modal>
    </>
  )
}

export default UserCardReview
