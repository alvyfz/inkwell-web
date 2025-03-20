import { Suspense } from 'react'
import VerifyForgotPassword from './components/VerifyForgotPassword'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verify Forgot Password'
}
export default function VerifyForgotPasswordPage() {
  return (
    <Suspense>
      <VerifyForgotPassword />
    </Suspense>
  )
}
