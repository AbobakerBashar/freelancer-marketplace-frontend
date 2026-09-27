import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const isAuthPage =
		pathname.startsWith("/auth/signin") ||
		pathname.startsWith("/auth/register");

	const isProtected =
		pathname.startsWith("/dashboard") ||
		pathname.startsWith("/cart") ||
		pathname.startsWith("/checkout") ||
		pathname.includes("/proposal");

	const token = req.cookies.get("jwt")?.value;

	if (!token && isProtected) {
		return NextResponse.redirect(new URL("/auth/signin", req.url));
	}

	// If is an auth page and the user is already logged in, redirect to home page
	if (token && isAuthPage) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	// If the user is logged in and trying to access a protected page, allow access
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/cart",
		"/checkout/:path*",
		"/projects/:path*/proposal/:path*",
		"/auth/signin",
		"/auth/register",
	],
};
