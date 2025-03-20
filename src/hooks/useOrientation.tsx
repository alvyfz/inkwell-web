import { useEffect, useState } from 'react'

const useOrientation = () => {
  const [orientation, setOrientation] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && screen.orientation) {
      setOrientation(screen.orientation.type)

      const handleOrientationChange = () => {
        setOrientation(screen.orientation.type)
      }

      screen.orientation.addEventListener('change', handleOrientationChange)

      return () => {
        screen.orientation.removeEventListener('change', handleOrientationChange)
      }
    }
  }, [])

  return orientation
}

export default useOrientation
