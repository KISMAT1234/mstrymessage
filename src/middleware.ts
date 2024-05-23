import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],  // The config object specifies a list of paths (matcher) where this middleware should be applied. These paths include routes for the dashboard, sign-in, sign-up, verification, and the home page.
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log(token,'getting user token in middleware')
  const url = request.nextUrl;
  console.log(url,'url requesting to nexturl')

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')             // If a token exists and the user tries to access certain routes (/sign-in, /sign-up, /verify, or /), the middleware redirects them to the dashboard (/dashboard).
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {  // If there's no token and the user tries to access the dashboard route (/dashboard), they are redirected to the sign-in page (/sign-in).
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}