'use client'

import { Image } from '@heroui/react'
import { useTheme } from 'next-themes'

export const BrandLogo = ({
  size = 20,
  className = '',
  color
}: {
  size?: number
  color?: 'black' | 'white'
  className?: string
}) => {
  const { theme } = useTheme()
  const typeTheme = theme === 'dark' ? 'white' : 'black'
  const type = color ?? typeTheme

  return (
    <div className={`${className}`}>
      {type && (
        <Image src={`/brand/brand-full-${type}.png`} height={size} alt="brand" radius="none" />
      )}
    </div>
  )
}
