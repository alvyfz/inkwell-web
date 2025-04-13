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
  Button
} from '@heroui/react'
import { BrandLogo } from '../BrandLogo'
import { ReactNode } from 'react'
import { useAuth } from '@/contexts/authContext'
import ThemeModeButton from '../ThemeModeButton'
import { Icon } from '@iconify/react/dist/iconify.js'
import { usePathname } from 'next/navigation'

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
      <NavbarBrand>
        <Link href="/app">
          <BrandLogo size={30} />
        </Link>
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
                size="sm"
                startContent={<Icon icon="ic:outline-create" />}
                className="text-base"
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
                  size="sm"
                >
                  Signup
                </Button>
                <Button
                  as={Link}
                  href={`/login?redirect=${pathname}`}
                  variant="light"
                  color="primary"
                  size="sm"
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
                    size="sm"
                    src={user?.avatar}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem as={Link} href="/profile" key="settings">
                    My Settings
                  </DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">Configurations</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
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
