import { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthContextType = {
  user: any
  setUser: (user: any) => void
  logout: () => void
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = Cookies.get('Authorization') as string

    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))

      setUser(decodedToken)
    } else {
      setUser(null)
    }
  }, [children])

  const logout = useCallback(() => {
    setUser(null)
    Cookies.remove('Authorization')
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, logout } as AuthContextType}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext<AuthContextType>(AuthContext as any)
