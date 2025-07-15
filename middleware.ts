import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Protected routes
  const protectedPaths = ['/dashboard']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Add user info to headers for use in pages
    const response = NextResponse.next()
    response.headers.set('x-user-id', decoded.id)
    response.headers.set('x-user-email', decoded.email)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
