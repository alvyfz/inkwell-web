import { Button } from '@heroui/react'
import { ReactNode } from 'react'

export const confirmationModal = (
  setState: (key: string, value: any) => void,
  content: {
    content: string | ReactNode
    action: () => void
  }
) => {
  setState('modal', {
    visible: true,
    title: 'Confirmation',
    placement: 'auto',
    component: () => <>{content.content}</>,
    footer: (onClose: () => void) => (
      <>
        <Button
          color="danger"
          variant="light"
          onPress={() => {
            onClose()
          }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onPress={() => {
            onClose()
            content.action()
          }}
        >
          Confirm
        </Button>
      </>
    )
  })
}
