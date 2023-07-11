'use client'
import ProtectedRoutes from '../(protected-routes)/ProtectedRoutes'
import AdminView from './AdminView'

function Admin() {
  return (
    <ProtectedRoutes>
      <main>
        <AdminView />
      </main>
    </ProtectedRoutes>
  )
}

export default Admin
