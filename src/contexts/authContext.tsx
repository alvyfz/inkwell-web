'use client'

import { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthContextType = {
  user: Session['user'] | null
  setUser: (user: any) => void
  logout: () => void
  isLoggedIn: boolean | null
  isLoading: boolean
  session: Session | null
  loginJustCompleted: boolean
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  const [user, setUser] = useState<Session['user'] | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [loginJustCompleted, setLoginJustCompleted] = useState(false)

  // Update user state when session changes
  useEffect(() => {
    if (status === 'loading') {
      setIsLoggedIn(null)
      return
    }

    if (session?.user) {
      setUser(session.user)
      setIsLoggedIn(true)

      // Detect successful login
      console.log('✅ Login berhasil!', {
        user: session.user,
        timestamp: new Date().toISOString()
      })

      // Set login completed flag
      setLoginJustCompleted(true)

      // Reset flag after 3 seconds
      const timer = setTimeout(() => {
        setLoginJustCompleted(false)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setUser(null)
      setIsLoggedIn(false)
      setLoginJustCompleted(false)
    }
  }, [session, status])

  const logout = useCallback(async () => {
    setUser(null)
    setIsLoggedIn(false)
    setLoginJustCompleted(false)
    await signOut({ redirect: false })
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isLoggedIn,
        isLoading: status === 'loading',
        session,
        loginJustCompleted
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Hook khusus untuk mendeteksi status login
export const useLoginStatus = () => {
  const { isLoggedIn, isLoading, user, loginJustCompleted } = useAuth()

  return {
    isAuthenticated: isLoggedIn,
    isLoading,
    user,
    loginJustCompleted
  }
}
