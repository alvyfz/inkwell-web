'use client'

import { useGlobalState } from '@/contexts/globalContext'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal'

export default function ModalProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useGlobalState()
  const modal = state.modal

  const onCloseChanges = () => {
    if (modal?.visible) {
      if (modal?.onClose) {
        modal.onClose()
      }
      setState('modal', {
        ...modal,
        visible: false
      })
    }
  }
  return (
    <>
      <Modal
        isOpen={modal?.visible}
        size={modal?.size || 'md'}
        scrollBehavior={'inside'}
        onOpenChange={onCloseChanges}
        classNames={modal?.classNames}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {modal?.title && (
                <ModalHeader className="flex flex-col gap-1">{modal.title}</ModalHeader>
              )}
              <ModalBody>{modal?.component(onClose)}</ModalBody>
              {modal?.footer && <ModalFooter>{modal.footer(onClose)}</ModalFooter>}
            </>
          )}
        </ModalContent>
      </Modal>
      {children}
    </>
  )
}
