'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '@/contexts/AuthContext'
import { GlobalProvider } from '@/contexts/globalContext'
import ModalProvider from '@/components/ModalProvider'
import LoginSuccessNotification from '@/components/LoginSuccessNotification'
import { SessionDebug } from '@/components/AuthStatus'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <GlobalProvider>
              <ToastProvider placement="bottom-center" />
              <ModalProvider>
                {children}
                <LoginSuccessNotification />
                <SessionDebug />
              </ModalProvider>
            </GlobalProvider>
          </AuthProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  )
}
