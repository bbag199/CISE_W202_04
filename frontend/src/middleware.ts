import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected paths
  const protectedPaths = ["/pages/submit", "/pages/moderate", "/pages/analyse"];

  // Check if the request path is one of the protected paths
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get("access_token");

    // If no token is present, redirect to the login page
    if (!token) {
      const loginUrl = new URL("/pages/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pages/submit/", "/pages/moderate/", "/pages/analyse/"],
};
