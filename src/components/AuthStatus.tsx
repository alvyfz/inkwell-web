'use client'

import { useAuth } from '@/contexts/AuthContext'
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

interface AuthStatusProps {
  className?: string
}

export default function AuthStatus({ className = '' }: AuthStatusProps) {
  const { user, isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
        <span>Loading...</span>
      </div>
    )
  }

  if (isLoggedIn && user) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <div className="flex items-center space-x-2">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name || 'User'}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name || 'User'}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-gray-600">Not logged in</span>
      <button
        onClick={() => signIn()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </div>
  )
}

// Komponen untuk menampilkan detail session (untuk debugging)
export function SessionDebug() {
  const { session, user, isLoggedIn, isLoading } = useAuth()

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Auth Debug Info:</h3>
      <div className="space-y-1">
        <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
        <div>Logged In: {isLoggedIn ? 'Yes' : 'No'}</div>
        <div>User ID: {user?.id || 'None'}</div>
        <div>Username: {user?.username || 'None'}</div>
        <div>Email: {user?.email || 'None'}</div>
        <div>Session: {session ? 'Active' : 'None'}</div>
      </div>
    </div>
  )
}
