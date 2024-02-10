import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { isUserAuthenticated, profileSetupComplete } from '@/lib/services/SupabaseAuthService';
import { getMiddlewareClient } from '@/lib/supabase';

export async function middleware(req: NextRequest) {
  const supabase = await getMiddlewareClient(req);
  const userAuthenticated = await isUserAuthenticated(supabase);
  const isProtectedRoute = req.nextUrl.pathname.startsWith(protectedRoutesPrefix);
  if (!userAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
  }
  if (userAuthenticated && !await profileSetupComplete(supabase) && !profileNotRequiredPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/app/sign-up', req.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
};

const protectedRoutesPrefix = '/app';
const profileNotRequiredPaths = ['/auth/login', '/app/sign-up'];
