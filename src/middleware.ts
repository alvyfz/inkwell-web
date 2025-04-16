import { NextResponse, NextRequest } from 'next/server'

const isTokenExpired = (token: string) => {
  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  const currentTime = new Date().getTime() / 1000

  return decodedToken.exp < currentTime
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  // const lang = request.cookies.get('lang')?.value
  const isPublicPath = publicPath.includes(path)
  const isPrivatePath = privatePath.includes(path)
  const isHybridPath = hybridPath.includes(path)

  const token = request.cookies.get('Authorization')?.value as string

  // check if token is expired
  if ((isPrivatePath && token && isTokenExpired(token)) || (isPrivatePath && !token)) {
    const response = NextResponse.redirect(new URL('/login?redirect=' + path, request.nextUrl))
    response.cookies.delete('Authorization')
    return response
  }

  if (isHybridPath && token && isTokenExpired(token)) {
    const response = NextResponse.next()
    response.cookies.delete('Authorization')
    return response
  }

  // check if user is already logged in and trying to access login and password page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
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
