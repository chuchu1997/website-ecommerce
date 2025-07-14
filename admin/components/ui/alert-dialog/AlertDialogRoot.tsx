'use client'

import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'
import { useAlertDialogContext } from './AlertDialogProvider'

export const AlertDialogRoot = () => {
  const { isOpen, closeDialog, dialogData } = useAlertDialogContext()

  return (
    <AlertDialog open={isOpen} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogData.title }</AlertDialogTitle>
          <AlertDialogDescription>
            {dialogData.description }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{dialogData.cancelText }</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              dialogData.onConfirm?.()
              closeDialog()
            }}
          >
            {dialogData.confirmText }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
