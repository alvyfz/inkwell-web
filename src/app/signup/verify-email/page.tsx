import type { Metadata } from 'next'
import SignupVerifyEmail from './components/SignupVerifyEmail'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Verify Email'
}
export default function SignupVerifyEmailPage() {
  return (
    <Suspense>
      <SignupVerifyEmail />
    </Suspense>
  )
}
