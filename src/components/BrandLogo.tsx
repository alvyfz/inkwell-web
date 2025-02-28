import { className } from 'postcss-selector-parser'

export const BrandLogo = ({
  size = '3xl',
  color = 'primary',
  className = ''
}: {
  size?: string
  color?: string
  className?: string
}) => (
  <div className={className}>
    <h1 className={`text-${color} font-brand font-bold text-${size}`}>Inkwell.</h1>
  </div>
)
