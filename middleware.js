import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export function middleware(request) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!cookie || !secret || cookie !== secret) {
    const loginUrl = new URL("/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
