import { getUser } from "@/features/auth/api";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../LogoutButton";

const fetchUser = async () => {
	const res = await getUser();
	if (!res.success) return null;
	return res.user;
};

async function Header() {
	const user = await fetchUser();

	const isAuthenticated = !!user;

	return (
		<header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl flex h-20 items-center justify-between gap-4 page-container">
			<nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
				<Link className="transition-colors hover:text-foreground" href="/">
					Home
				</Link>
				<Link className="transition-colors hover:text-foreground" href="/about">
					About
				</Link>
				<Link
					className="transition-colors hover:text-foreground"
					href="#categories"
				>
					Categories
				</Link>
				<Link
					className="transition-colors hover:text-foreground"
					href="/projects"
				>
					Projects
				</Link>
				<Link
					className="transition-colors hover:text-foreground"
					href="/contact"
				>
					Contact
				</Link>
				{isAuthenticated && (
					<Link
						className="transition-colors hover:text-foreground"
						href="/dashboard"
					>
						Dashboard
					</Link>
				)}
			</nav>

			{isAuthenticated ? (
				<LogoutButton className="hidden sm:inline-flex" />
			) : (
				<div className="flex items-center gap-2 sm:gap-3">
					<Link
						href="/auth/signin"
						className="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
					>
						Sign in
					</Link>
					<Link
						href="/auth/register"
						className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
					>
						Start free
						<ChevronRight className="ml-1 size-4" />
					</Link>
				</div>
			)}
		</header>
	);
}

export default Header;
