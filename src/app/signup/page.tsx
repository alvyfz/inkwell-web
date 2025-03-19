import Signup from './components/Signup'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signup'
}
export default function SignupPage() {
  return <Signup />
}
