import { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthContextType = {
  user: any
  setUser: (user: any) => void
  logout: () => void
  isLoggedIn: boolean | null
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const token = Cookies.get('Authorization') as string

    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))

      setUser(decodedToken)
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
      setUser(null)
    }
  }, [pathname, children])

  const logout = useCallback(() => {
    setUser(null)
    Cookies.remove('Authorization')
    router.refresh()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoggedIn } as AuthContextType}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext<AuthContextType>(AuthContext as any)
