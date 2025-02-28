import { addToast } from '@heroui/react'
import { ReactNode } from 'react'
import { Icon } from '@iconify/react'

const handleToast = (title?: string, description?: string, color?: any, icon?: ReactNode) =>
  addToast({
    title,
    description,
    color,
    icon,
    timeout: 5000
  })

const toast = {
  success: (description: string) =>
    handleToast(
      'Success',
      description,
      'success',
      <Icon icon="ic:round-check-circle" fontSize="24" />
    ),
  error: (description: string) => handleToast('Error', description, 'danger'),
  info: (title: string, description?: string) => handleToast(title, description),
  handleToast
}

export default toast
