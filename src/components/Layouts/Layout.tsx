import React, { ReactNode } from 'react'
import { ClientNavbar } from '../Headers/Navbar.client'

export default function Layout({
  children,
  // isLoading,
  screenClassName = '',
  className = '',
  isNoSpacing = false,
  navbarContent,
  navbarContentClassName,
  navbarContentJustify,
  hiddenWriteButton
}: {
  children: React.ReactNode
  isLoading?: boolean
  screenClassName?: string
  className?: string
  isNoSpacing?: boolean
  navbarContent?: ReactNode
  navbarContentClassName?: string
  navbarContentJustify?: 'center' | 'start' | 'end' | undefined
  hiddenWriteButton?: boolean
}) {
  return (
    <div>
      <ClientNavbar
        navbarContent={navbarContent}
        navbarContentClassName={navbarContentClassName}
        navbarContentJustify={navbarContentJustify}
        hiddenWriteButton={hiddenWriteButton}
      />
      <div className={`flex flex-row min-h-screen justify-center ${screenClassName}`}>
        <div
          className={`flex flex-col w-full h-full max-w-[1336px] ${!isNoSpacing ? 'px-4 sm:px-8 md:px-12 xl:px-16' : ''} ${className}`}
        >
          {/*<LoadingOverlay visible={isLoading} />*/}
          {children}
        </div>
      </div>
    </div>
  )
}
