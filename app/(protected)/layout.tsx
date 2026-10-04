import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashbordSidebar from "@/components/dashboard/DashbordSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<DashbordSidebar />
			<div className="flex min-h-screen flex-col bg-background flex-1">
				<DashboardHeader />
				{children}
			</div>
		</SidebarProvider>
	);
};
export default layout;
