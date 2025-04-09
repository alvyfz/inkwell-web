import { Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { useTheme } from 'next-themes'

export default function ThemeModeButton({
  variant = 'solid',
  className = ''
}: {
  variant?: 'flat' | 'light' | 'solid' | 'bordered' | 'faded' | 'shadow' | 'ghost' | undefined
  className?: string
}) {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      isIconOnly
      aria-label="theme-mode"
      onPress={() => setTheme(isDark ? 'light' : 'dark')}
      className={className}
      color="primary"
      variant={variant}
    >
      <Icon icon={isDark ? 'ic:twotone-light-mode' : 'ic:twotone-dark-mode'} fontSize={24} />
    </Button>
  )
}
