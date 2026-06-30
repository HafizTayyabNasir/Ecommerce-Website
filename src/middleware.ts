import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Routes that require admin access
const adminRoutes = ["/admin"];

// Routes that require authentication
const protectedRoutes = ["/account", "/wishlist"];

// Auth routes - redirect to home if already logged in
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;

  // Admin route protection
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is staff (SUPPORT, MANAGER, ADMIN, or OWNER)
    const staffRoles = ["SUPPORT", "MANAGER", "ADMIN", "OWNER"];
    if (!staffRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protected route check
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/:path*",
    "/wishlist/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
