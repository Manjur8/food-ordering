import { User } from '@/type'
import { create } from 'zustand'

type AuthStore = {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean

  setIsAuthenticated: (value: boolean) => void
  setUser: (user: User|null) => void
  setIsLoading: (loading: boolean) => void

  setAuthenticated: (user: User|null) => void
}

const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setIsLoading: (value) => set({isLoading: value}),

  setAuthenticated: (user) => set({user, isAuthenticated: !!user})
}))

export default useAuthStore;