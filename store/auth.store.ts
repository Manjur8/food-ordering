import { getCurrentUser } from '@/lib/appWrite'
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

  fetchAuthenticatedUser: () => Promise<void>
}

const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setIsLoading: (value) => set({isLoading: value}),

  setAuthenticated: (user) => set({user, isAuthenticated: !!user}),

  fetchAuthenticatedUser: async () => {
    set({isLoading: true})
    try {
      const currentUser = await getCurrentUser();
      if(currentUser) {
        set({isAuthenticated: true, user: currentUser as unknown as User})
      } else {
        set({isAuthenticated: false, user: null})
      }
    } catch(err) {
      console.log(err)
      set({isAuthenticated: false, user: null})
    } finally {
      set({isLoading: false})
    }
  }
}))

export default useAuthStore;