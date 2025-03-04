export const BrandLogo = ({
  size = 18,
  color = 'primary',
  className = ''
}: {
  size?: number
  color?: string
  className?: string
}) => (
  <div className={className}>
    <h1 style={{ fontSize: size }} className={`text-${color} font-brand font-bold  ]`}>
      Inkwell.
    </h1>
  </div>
)
