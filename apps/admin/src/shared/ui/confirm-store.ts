import { create } from 'zustand'

interface ConfirmState {
  isOpen: boolean
  title: string
  description: string
  confirmLabel: string
  variant: 'default' | 'destructive'
  resolve: ((value: boolean) => void) | null
  confirm: (options: {
    title: string
    description: string
    confirmLabel?: string
    variant?: 'default' | 'destructive'
  }) => Promise<boolean>
  handleConfirm: () => void
  handleCancel: () => void
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  isOpen: false,
  title: '',
  description: '',
  confirmLabel: '\uD655\uC778',
  variant: 'destructive',
  resolve: null,
  confirm: options => {
    return new Promise<boolean>(resolve => {
      set({
        isOpen: true,
        title: options.title,
        description: options.description,
        confirmLabel: options.confirmLabel ?? '\uD655\uC778',
        variant: options.variant ?? 'destructive',
        resolve,
      })
    })
  },
  handleConfirm: () => {
    get().resolve?.(true)
    set({ isOpen: false, resolve: null })
  },
  handleCancel: () => {
    get().resolve?.(false)
    set({ isOpen: false, resolve: null })
  },
}))
