'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  Image
} from '@heroui/react'
import { ReactNode } from 'react'
import { useAuth } from '@/contexts/authContext'
import ThemeModeButton from '../ThemeModeButton'
import { Icon } from '@iconify/react/dist/iconify.js'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

export const ClientNavbar = ({
  navbarContent,
  navbarContentClassName = '',
  navbarContentJustify = 'center',
  hiddenWriteButton = false,
  navbarEndContent
}: {
  navbarContent?: ReactNode
  navbarContentClassName?: string
  navbarContentJustify?: 'center' | 'start' | 'end' | undefined
  hiddenWriteButton?: boolean
  navbarEndContent?: ReactNode
}) => {
  const pathname = usePathname()
  const { user, logout, isLoggedIn } = useAuth()

  return (
    <Navbar shouldHideOnScroll maxWidth="full" isBordered>
      <NavbarBrand as={Link} href="/app">
        <div className="p-1 bg-white rounded-md ">
          <Image
            src={'/brand/brand.svg'}
            height={40}
            style={{ color: 'red' }}
            width={'auto'}
            alt="brand"
            radius="none"
          />
        </div>
      </NavbarBrand>
      {navbarContent && (
        <NavbarContent className={navbarContentClassName} justify={navbarContentJustify}>
          {navbarContent}
        </NavbarContent>
      )}
      <NavbarContent as="div" className="items-center gap-4" justify="end">
        {navbarEndContent}
        {isLoggedIn !== null && (
          <>
            {!hiddenWriteButton && (
              <Button
                as={Link}
                href={!!user ? '/app/new-story' : '/login?redirect=/app/new-story'}
                variant="light"
                color="primary"
                startContent={<Icon icon="ic:outline-create" />}
              >
                Write
              </Button>
            )}
            <ThemeModeButton variant="light" className="hidden sm:flex" />
            {!user && (
              <>
                <Button
                  className="hidden sm:flex"
                  as={Link}
                  href={`/signup?redirect=${pathname}`}
                  color="primary"
                >
                  Signup
                </Button>
                <Button
                  as={Link}
                  href={`/login?redirect=${pathname}`}
                  variant="light"
                  color="primary"
                >
                  Login
                </Button>
              </>
            )}
            {!!user && (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={user?.name}
                    src={user?.avatar}
                    size="sm"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user?.email}</p>
                  </DropdownItem>

                  {user && (
                    <DropdownItem as={Link} href="/app/me/stories" key="stories">
                      My Stories
                    </DropdownItem>
                  )}

                  <DropdownItem key="logout" color="danger" onPress={logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}
