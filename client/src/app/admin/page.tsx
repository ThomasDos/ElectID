'use client'
import ProtectedRoutesWallet from '@app/(protected-routes)/wallet/ProtectedRoutesWallet'
import AdminView from './(components)/AdminView'

function Admin() {
  return (
    <ProtectedRoutesWallet>
      {/* <ProtectedRoutesAdmin> */}
      <AdminView />
      {/* </ProtectedRoutesAdmin> */}
    </ProtectedRoutesWallet>
  )
}

export default Admin
