import ProtectedRoutesWallet from '@app/(protected-routes)/wallet/ProtectedRoutesWallet'
import CreateNewId from './(components)/CreateNewId'

function CreateNewIdPage() {
  return (
    <ProtectedRoutesWallet>
      <CreateNewId />
    </ProtectedRoutesWallet>
  )
}

export default CreateNewIdPage
