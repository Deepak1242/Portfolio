import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Skip token verification in middleware to avoid edge runtime issues
    // Token verification will be done in the dashboard component
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
