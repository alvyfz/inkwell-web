import { useEffect, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'

const useActivityTracker = (onIdle: () => void, onPageLeave: () => void, idleTime = 30000) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Memoize onPageLeave to prevent unnecessary re-renders
  const stableOnPageLeave = useCallback(onPageLeave, [onPageLeave])

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>

    const resetTimer = debounce(() => {
      clearTimeout(idleTimer)
      idleTimer = setTimeout(onIdle, idleTime)
    }, 500) // Debounce for 500ms

    // Events to reset the timer
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart']
    events.forEach((event) => window.addEventListener(event, resetTimer))

    // Start the timer initially
    resetTimer()

    // Listen for page unload (closing tab or refreshing)
    const handlePageLeave = () => {
      stableOnPageLeave()
    }
    window.addEventListener('beforeunload', handlePageLeave)

    // Cleanup
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer))
      clearTimeout(idleTimer)
      window.removeEventListener('beforeunload', handlePageLeave)
    }
  }, [onIdle, stableOnPageLeave, idleTime])

  // Detect route changes using pathname and searchParams
  useEffect(() => {
    stableOnPageLeave() // Call onPageLeave when route changes
  }, [pathname, searchParams, stableOnPageLeave])
}

export default useActivityTracker
