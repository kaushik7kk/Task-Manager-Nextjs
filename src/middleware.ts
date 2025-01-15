import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  // Define route groups
  const protectedRoutes: string[] = ["/dashboard"];
  const authRestrictedRoutes: string[] = ["/login", "/register", "/landing"];

  const { pathname } = req.nextUrl;

  // If accessing a protected route that contains 'dashboard'
  if (protectedRoutes.some(route => pathname.includes(route))) {
    if (!token) {
      // Redirect unauthenticated users to login
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname); // Preserve original path
      return NextResponse.redirect(url);
    }
  }

  // If accessing an auth-restricted route
  if (authRestrictedRoutes.includes(pathname)) {
    if (token) {
      // Redirect authenticated users to the dashboard
      url.pathname = `/dashboard/${token.username}`;
      return NextResponse.redirect(url);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Matcher configuration for dynamic routes
export const config = {
  matcher: ["/dashboard/:username", "/landing", "/login", "/register"],
};
