import { auth } from '@/services/firebase'
import { useAppSettingsStore } from '@/store/app-settings'
import SignInAdmin from './SignInAdmin'

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const isAdmin = useAppSettingsStore((state) => state.isAdmin)
  const { currentUser } = auth
  console.log('currentUser:', currentUser)

  if (!isAdmin) {
    return <SignInAdmin />
  }

  return <div>{children}</div>
}

export default ProtectedRoutes
