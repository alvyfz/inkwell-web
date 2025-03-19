import type { Metadata } from 'next'
import SignupVerifyEmail from './components/SignupVerifyEmail'

export const metadata: Metadata = {
  title: 'Verify Email'
}
export default function SignupVerifyEmailPage() {
  return <SignupVerifyEmail />
}
