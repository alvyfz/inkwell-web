import { Suspense } from 'react'
import ForgotPassword from './components/ForgotPassword'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password'
}
export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  )
}
