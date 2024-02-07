import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/AuthService';
import { SupabaseAuthService } from '@/lib/services/SupabaseAuthService';
import { getMiddlewareClient } from '@/lib/supabase';

export async function middleware(req: NextRequest) {
  const authService = new AuthService(new SupabaseAuthService(await getMiddlewareClient(req)));
  const userAuthenticated = await authService.isUserAuthenticated();
  const isProtectedRoute = req.nextUrl.pathname.startsWith(protectedRoutesPrefix);
  if (!userAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
  }
  if (userAuthenticated && !await authService.profileSetupComplete()) {
    return NextResponse.redirect(new URL('/app/sign-up', req.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};

const protectedRoutesPrefix = '/app';
