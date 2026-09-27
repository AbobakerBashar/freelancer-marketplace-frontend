import DashbordSidebar from "@/components/dashboard/DashbordSidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			<div>
				<SidebarProvider>
					<DashbordSidebar />
					{children}
				</SidebarProvider>
			</div>
		</>
	);
};
export default layout;
