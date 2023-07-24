import { useAppSettingsStore } from '@/store/app-settings'
import SignInAdmin from './SignInAdmin'

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const isAdmin = useAppSettingsStore((state) => state.isAdmin)

  if (!isAdmin) {
    return <SignInAdmin />
  }

  return <div>{children}</div>
}

export default ProtectedRoutes
