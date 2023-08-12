import NewIDForm from '@/components/new-id-form/new-id-form'
import ProtectedRoutesWallet from '../(protected-routes)/wallet/ProtectedRoutesWallet'

function CreateNewId() {
  return (
    <ProtectedRoutesWallet>
      <div className='flex flex-col items-center justify-center h-full'>
        <NewIDForm />
      </div>
    </ProtectedRoutesWallet>
  )
}

export default CreateNewId
