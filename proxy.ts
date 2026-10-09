import { NextRequest, NextResponse } from "next/server";

import { getUser } from "@/features/auth/api";

export default async function proxy(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	const isAuthPage =
		pathname.startsWith("/auth/signin") ||
		pathname.startsWith("/auth/register");

	const isProtected =
		pathname.startsWith("/dashboard") ||
		pathname.includes("/workspace") ||
		pathname.includes("/proposal");

	const user = await getUser();

	const isLoggedIn = user.success && user.user !== null;
	const role = user.user?.role || "guest";

	if (!isLoggedIn && isProtected) {
		return NextResponse.redirect(new URL("/auth/signin", req.url));
	}

	// If is an auth page and the user is already logged in, redirect to home page
	if (isLoggedIn && isAuthPage) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	// If the user is a freelancer and tries to access the projects page, redirect to the dashboard
	if (
		isLoggedIn &&
		role === "FREELANCER" &&
		pathname.startsWith("/dashboard/my-projects")
	) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	// If the user is a client and tries to access the projects page, redirect to the dashboard
	if (
		isLoggedIn &&
		role === "CLIENT" &&
		pathname.startsWith("/dashboard/my-proposals")
	) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	// If the user is logged in and trying to access a protected page, allow access
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/projects/:path*/proposal/:path*",
		"/projects/:path*/workspace/:path*",
		"/auth/signin",
		"/auth/register",
	],
};
