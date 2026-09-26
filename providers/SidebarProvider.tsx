"use client";
import { SidebarProvider as SidebarProviderComponent } from "@/components/ui/sidebar";

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
	return <SidebarProviderComponent>{children}</SidebarProviderComponent>;
};
export default SidebarProvider;
