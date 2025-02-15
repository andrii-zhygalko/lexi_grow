import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/dictionary', '/recommend', '/training'];
const authPaths = ['/login', '/register'];
const publicPaths = ['/images', '/api', '/_next', '/favicon.svg'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dictionary', request.url));
  }

  if (token && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/dictionary', request.url));
  }

  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|images|favicon.svg).*)'],
};
