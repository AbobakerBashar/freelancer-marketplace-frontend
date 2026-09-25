import { QueryProvider } from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Freelance Marketplace",
	description:
		"Discover vetted freelancers, browse active categories, and move projects forward faster.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background`}
		>
			<QueryProvider>
				<body className="min-h-screen bg-background text-foreground">
					{children}
				</body>
			</QueryProvider>
		</html>
	);
}
