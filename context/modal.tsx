'use client'

import { createContext, useContext, useState } from 'react'

interface ModalContextType {
  isOpenModal: boolean
  showModal: () => void
  hideModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const showModal = () => setIsOpenModal(true)
  const hideModal = () => setIsOpenModal(false)

  return (
    <ModalContext.Provider value={{ isOpenModal, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }
  return context
}
