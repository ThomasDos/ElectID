import { create } from 'zustand'

interface AppSettingsState {
  isAdmin: boolean
}

interface AppSettingsActions {
  setIsAdmin: (isAdmin: boolean) => void
}

export const useAppSettingsStore = create<AppSettingsState & AppSettingsActions>((set) => ({
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin })
}))
