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
  const token = request.cookies.get('Authorization')?.value as string

  // check if token is expired
  if (!isPublicPath && token) {
    if (isTokenExpired(token)) {
      const response = NextResponse.redirect(new URL('/login?action=expired', request.nextUrl))
      response.cookies.delete('Authorization')
      return response
    }
  }
  if ((isPrivatePath && !token) || (isPrivatePath && token && isTokenExpired(token))) {
    return NextResponse.redirect(new URL(`/login?redirect=${path}`, request.nextUrl))
  }

  // check if user is already logged in and trying to access login and password page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // check if user is not logged in and trying to access private page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/app', '/login', '/signup', '/app/new-story']
}

const publicPath = ['/login', '/signup']

const privatePath = ['/app/new-story']
