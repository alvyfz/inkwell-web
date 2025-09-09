import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = publicPath.includes(path)
  const isPrivatePath = privatePath.includes(path)
  const isHybridPath = hybridPath.includes(path)

  // Get NextAuth.js token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // check if user needs authentication for private paths
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/login?redirect=' + path, request.nextUrl))
  }

  // check if user is already logged in and trying to access login page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/app', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {}

const publicPath = [
  '/login',
  '/signup',
  '/signup/verify-email',
  '/forgot-password',
  '/forgot-password/verify'
]

const privatePath = [
  '/app/new-story, /app/me',
  '/app/me/stories',
  '/app/me/stories/drafts',
  '/app/me/stories/published'
]

const hybridPath = ['/app']
