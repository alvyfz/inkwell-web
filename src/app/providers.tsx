'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { AuthProvider } from '@/contexts/authContext'
import { GlobalProvider } from '@/contexts/globalContext'
import ModalProvider from '@/components/ModalProvider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <GlobalProvider>
            <ToastProvider placement="bottom-center" />
            <ModalProvider>{children}</ModalProvider>
          </GlobalProvider>
        </AuthProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
