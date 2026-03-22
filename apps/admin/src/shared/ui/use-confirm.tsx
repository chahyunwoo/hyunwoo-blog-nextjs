import { useState } from 'react'
import { ConfirmDialog } from './confirm-dialog'

interface ConfirmOptions {
  title: string
  description: string
  confirmLabel?: string
  variant?: 'default' | 'destructive'
}

export function useConfirm() {
  const [state, setState] = useState<(ConfirmOptions & { resolve: (value: boolean) => void }) | null>(null)

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise(resolve => {
      setState({ ...options, resolve })
    })
  }

  const handleConfirm = () => {
    state?.resolve(true)
    setState(null)
  }

  const handleCancel = () => {
    state?.resolve(false)
    setState(null)
  }

  const ConfirmDialogComponent = state ? (
    <ConfirmDialog
      open={true}
      onOpenChange={open => {
        if (!open) handleCancel()
      }}
      title={state.title}
      description={state.description}
      confirmLabel={state.confirmLabel}
      variant={state.variant}
      onConfirm={handleConfirm}
    />
  ) : null

  return { confirm, ConfirmDialog: ConfirmDialogComponent }
}
