import Link from "next/link";
import { BriefcaseBusiness, ChevronRight } from "lucide-react";

function Header() {
	return (
		<header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
			<div className="page-container flex h-20 items-center justify-between gap-4">
				<Link href="/" className="flex items-center gap-3">
					<span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
						<BriefcaseBusiness className="size-5" />
					</span>
					<span className="hidden flex-col leading-tight sm:flex">
						<span className="text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground">
							Freelance
						</span>
						<span className="text-sm font-semibold tracking-tight text-foreground">
							Marketplace
						</span>
					</span>
				</Link>

				<nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
					<Link className="transition-colors hover:text-foreground" href="/">
						Home
					</Link>
					<Link
						className="transition-colors hover:text-foreground"
						href="/about"
					>
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
				</nav>

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
			</div>
		</header>
	);
}

export default Header;
