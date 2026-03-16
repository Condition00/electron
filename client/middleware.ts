import { NextResponse, type NextRequest } from 'next/server';

const AUTH_COOKIE = 'electron_auth_token';

const protectedRoutes = ['/account', '/cart'];
const guestOnlyRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const isAuthenticated = Boolean(token);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isGuestOnlyRoute && isAuthenticated) {
    const accountUrl = new URL('/account', request.url);
    return NextResponse.redirect(accountUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/cart/:path*', '/login/:path*', '/signup/:path*'],
};
