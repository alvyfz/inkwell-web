'use client'

import { useEffect, useState } from 'react'
import { useLoginStatus } from '@/contexts/AuthContext'

interface LoginSuccessNotificationProps {
  className?: string
}

export default function LoginSuccessNotification({
  className = ''
}: LoginSuccessNotificationProps) {
  const { loginJustCompleted, user } = useLoginStatus()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (loginJustCompleted && user) {
      setShow(true)

      // Auto hide after 4 seconds
      const timer = setTimeout(() => {
        setShow(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [loginJustCompleted, user])

  if (!show) return null

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="font-semibold">Login Berhasil!</p>
          <p className="text-sm opacity-90">
            Selamat datang, {user?.name || user?.username || 'User'}!
          </p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="ml-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

// CSS untuk animasi (tambahkan ke globals.css)
/*
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
*/
