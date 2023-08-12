'use client'
import ProtectedRoutesAdmin from '../(protected-routes)/admin/ProtectedRoutesAdmin'
import ProtectedRoutesWallet from '../(protected-routes)/wallet/ProtectedRoutesWallet'
import AdminView from './AdminView'

function Admin() {
  return (
    <ProtectedRoutesWallet>
      <ProtectedRoutesAdmin>
        <main>
          <AdminView />
        </main>
      </ProtectedRoutesAdmin>
    </ProtectedRoutesWallet>
  )
}

export default Admin
