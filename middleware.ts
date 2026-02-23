import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './lib/session';

// middleware.ts

export async function middleware(request: NextRequest) {
    // Refresh the session on every request if it exists
    await updateSession();
    
    // Example: Protect /profile or /dashboard routes
    // if (request.nextUrl.pathname.startsWith('/profile')) {
    //     const session = await getUserSession();
    //     if (!session) {
    //         return NextResponse.redirect(new URL('/sign-in', request.url));
    //     }
    // }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
