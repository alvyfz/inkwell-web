'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <ToastProvider placement="bottom-center" />
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
