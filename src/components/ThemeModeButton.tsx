import { Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { useTheme } from 'next-themes'

export default function ThemeModeButton() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      isIconOnly
      aria-label="theme-mode"
      onPress={() => setTheme(isDark ? 'light' : 'dark')}
      className="m-4"
      color="primary"
    >
      <Icon icon={isDark ? 'ic:twotone-light-mode' : 'ic:twotone-dark-mode'} fontSize={24} />
    </Button>
  )
}
