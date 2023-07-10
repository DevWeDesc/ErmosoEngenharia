import { NextRequest, NextResponse } from 'next/server'
const signInURL = "localhost:3000/login"
export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
  if (!token) {

    return NextResponse.redirect(signInURL)
  }
    
}

export const config = {
  matcher: ['/home', '/reports', '/users', '/history'],
}