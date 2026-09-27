import Link from "next/link";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from "../ui/sidebar";
import LogoutButton from "../LogoutButton";

const links = [
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "My Proposals", href: "/dashboard/my-proposals" },
	{ name: "Settings", href: "/dashboard/settings" },
	{ name: "Profile", href: "/dashboard/profile" },
];

const DashbordSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader className="mt-20">Sidebar Header</SidebarHeader>
			<SidebarContent>
				<ul>
					{links.map((link) => (
						<li key={link.href} className="m-2">
							<Link
								href={link.href}
								className="px-2 py-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full block rounded-md"
							>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</SidebarContent>
			<SidebarFooter className="p-4">
				<LogoutButton />
			</SidebarFooter>
		</Sidebar>
	);
};
export default DashbordSidebar;
