import { useState, useEffect } from 'react'

const useOrientation = () => {
  const [isPortrait, setIsPortrait] = useState<'portrait' | 'landscape' | null>(null)

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
      const checkOrientation = () => {
        setIsPortrait(
          window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape'
        )
      }

      // Check orientation on mount
      checkOrientation()

      // Add event listener for orientation changes
      window.addEventListener('resize', checkOrientation)

      // Cleanup event listener on unmount
      return () => window.removeEventListener('resize', checkOrientation)
    }
  }, [])

  return isPortrait
}

export default useOrientation
