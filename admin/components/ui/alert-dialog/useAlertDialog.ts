import { useAlertDialogContext } from './AlertDialogProvider'

export const useAlertDialog = () => {
  const { openDialog } = useAlertDialogContext()
  return openDialog
}
