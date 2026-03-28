import { create } from 'zustand'

interface LoadingStore {
  isLoaded: boolean
  isIntroComplete: boolean
  setLoaded: () => void
  setIntroComplete: () => void
}

export const useLoadingStore = create<LoadingStore>(set => ({
  isLoaded: false,
  isIntroComplete: false,
  setLoaded: () => set({ isLoaded: true }),
  setIntroComplete: () => set({ isIntroComplete: true }),
}))
