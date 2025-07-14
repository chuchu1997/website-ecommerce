'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

type AlertDialogData = {
  title?: string
  description?: string
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
}

type AlertDialogContextType = {
  isOpen: boolean
  openDialog: (data: AlertDialogData) => void
  closeDialog: () => void
  dialogData: AlertDialogData
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined)

export const AlertDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dialogData, setDialogData] = useState<AlertDialogData>({})

  const openDialog = (data: AlertDialogData) => {
    setDialogData(data)
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setDialogData({})
  }

  return (
    <AlertDialogContext.Provider value={{ isOpen, openDialog, closeDialog, dialogData }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

export const useAlertDialogContext = () => {
  const context = useContext(AlertDialogContext)
  if (!context) throw new Error('useAlertDialogContext must be used within AlertDialogProvider')
  return context
}
