import { decodeJwt, isDevEnv, jwtExpToCookieExp } from '@/helpers/utils'
import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { cookies } from 'next/headers'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github' || account?.provider === 'google') {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/oauth-signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              provider: account.provider,
              providerId: account.providerAccountId,
              email: user.email,
              name: user.name,
              avatar: user.image,
              accessToken: account.access_token,
              refreshToken: account.refresh_token
            })
          })

          const data = await response.json()

          console.log(data)

          if (data.isSuccess) {
            // Update user object with backend data
            user.id = data.payload.user.id
            user.username = data.payload.user.username
            profile = data.payload.user

            // Set Authorization cookie with JWT token
            const jwtToken = data.payload.accessToken
            const decodedJwt = decodeJwt(jwtToken)
            const cookiesStore = await cookies()
            cookiesStore.set('Authorization', jwtToken, {
              expires: jwtExpToCookieExp(decodedJwt.exp),
              path: '/',
              httpOnly: true,
              secure: !isDevEnv
            })

            return true
          }
        } catch (error) {
          console.error('OAuth signin error:', error)
        }
        return false
      }
      return true
    },
    async jwt({ token, user, account }) {
      console.log(token, user, account, 'jwt')
      if (user) {
        token.id = user.id
        token.username = user.username
        token.avatar = user.image
      }
      return token
    },
    async session({ session, token }) {
      console.log(session, token, 'session')
      if (token) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.avatar = token.avatar as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
}
