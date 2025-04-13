import React, { Suspense } from 'react'

import Login from './components/login'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login'
}

export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  )
}
