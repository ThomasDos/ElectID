import ProtectedRoutesWallet from '@app/(protected-routes)/wallet/ProtectedRoutesWallet'
import NewIDForm from './(components)/new-id-form'

function CreateNewId() {
  return (
    <ProtectedRoutesWallet>
      <NewIDForm />
    </ProtectedRoutesWallet>
  )
}

export default CreateNewId
