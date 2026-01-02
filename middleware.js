// middleware.js in root
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/portfolio', '/trades'];
  const authRoutes = ['/login', '/register'];
  const adminRoutes = '/admin';
  const adminLoginRoute = '/admin/login';

  // Check if current path matches route types
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = pathname.startsWith(adminRoutes) && !pathname.startsWith(adminLoginRoute);
  const isAdminLoginRoute = pathname.startsWith(adminLoginRoute);

  // Handle admin routes
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      // Optional: Check if user has admin role
      // if (decoded.role !== 'admin') {
      //   return NextResponse.redirect(new URL('/admin/login', request.url));
      // }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Handle admin login route (redirect if already authenticated)
  if (isAdminLoginRoute && token) {
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch (error) {
      // Invalid token, continue to admin login page
    }
  }

  // Handle protected user routes
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Handle auth routes (redirect if already authenticated)
  if (isAuthRoute && token) {
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Invalid token, continue to auth page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/portfolio/:path*', 
    '/trades/:path*', 
    '/login', 
    '/register',
    '/admin/:path*'
  ]
};