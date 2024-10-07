import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/list"];
export default function middleWare(req: NextRequest) {
  const nameCookie = req.cookies.get("name");
  const userIsLoggedIn = Boolean(nameCookie);
  if (!userIsLoggedIn && protectedRoutes.includes(req.nextUrl.pathname)) {
    const redirectUrl = new URL("/authorization", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl.toString());
  }
}
