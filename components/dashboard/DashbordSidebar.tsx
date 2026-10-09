"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	BriefcaseBusiness,
	FileText,
	FolderKanban,
	LayoutDashboard,
	UserRound,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "../ui/sidebar";
import LogoutButton from "../LogoutButton";
import { useGetUser } from "@/features/auth/hooks";

const links = [
	{ name: "Overview", href: "/dashboard", icon: LayoutDashboard },
	{ name: "My projects", href: "/dashboard/my-projects", icon: FolderKanban },
	{
		name: "Active projects",
		href: "/dashboard/my-active-projects",
		icon: BriefcaseBusiness,
	},
	{ name: "My proposals", href: "/dashboard/my-proposals", icon: FileText },
	{ name: "Profile", href: "/dashboard/profile", icon: UserRound },
];

const DashbordSidebar = () => {
	const pathname = usePathname();
	const { data, isLoading: isLoadingUser } = useGetUser();
	const user = data?.user;

	return (
		<Sidebar className="border-r border-sidebar-border bg-sidebar">
			<SidebarHeader className="border-b border-sidebar-border/70 h-20 pl-3">
				<Link
					href="/dashboard"
					className="flex items-center justify-start gap-3 rounded-lg h-full"
				>
					<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/20">
						<BriefcaseBusiness className="size-5" />
					</span>
					<span className="min-w-0">
						<span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/55">
							Freelance
						</span>
						<span className="mt-0.5 block truncate text-sm font-semibold text-sidebar-foreground">
							Workspace
						</span>
					</span>
				</Link>
			</SidebarHeader>
			<SidebarContent className="px-3 py-6">
				<nav aria-label="Dashboard navigation">
					<p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/45">
						Workspace
					</p>
					<ul className="space-y-1">
						{links.map((link) => {
							const active =
								pathname === link.href ||
								(link.href !== "/dashboard" &&
									pathname.startsWith(`${link.href}/`));
							const Icon = link.icon;

							if (
								(user?.role === "CLIENT" &&
									link.href === "/dashboard/my-proposals") ||
								(user?.role === "FREELANCER" &&
									link.href === "/dashboard/my-projects")
							)
								return null;

							return (
								<li key={link.href}>
									{!isLoadingUser && (
										<Link
											href={link.href}
											aria-current={active ? "page" : undefined}
											className={`group flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
												active
													? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm shadow-sidebar-primary/15"
													: "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
											}`}
										>
											<Icon className="size-4.5 shrink-0 transition-transform group-hover:scale-105" />
											<span className="truncate">{link.name}</span>
										</Link>
									)}
								</li>
							);
						})}
					</ul>
				</nav>
			</SidebarContent>
			<SidebarFooter className="border-t border-sidebar-border/70 p-4">
				<LogoutButton className="w-full justify-start bg-transparent text-sidebar-foreground/65 shadow-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
			</SidebarFooter>
		</Sidebar>
	);
};
export default DashbordSidebar;
