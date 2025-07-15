import { NextRequest, NextResponse } from 'next/server'

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

    // Skip token verification in middleware for edge runtime compatibility
    // Token verification will be handled in the actual API routes
  }

  return NextResponse.next()
}
}

export const config = {
  matcher: ['/dashboard/:path*']
}
