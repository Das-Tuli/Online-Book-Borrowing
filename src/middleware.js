import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Check if better-auth session cookie exists
  const sessionToken = req.cookies.get('better-auth.session_token');
  
  const protectedRoutes = ['/profile', '/update-profile'];
  const isProtected = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route)) || req.nextUrl.pathname.startsWith('/books/');

  if (isProtected && !sessionToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/update-profile', '/books/:path*'],
};
