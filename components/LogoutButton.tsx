"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOutUser } from "@/features/auth/api";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
	className?: string;
};

const LogoutButton = ({ className }: LogoutButtonProps) => {
	const router = useRouter();

	const handleLogout = async () => {
		await signOutUser();

		router.refresh();
	};

	return (
		<Button variant="destructive" className={className} onClick={handleLogout}>
			<LogOut className="mr-2 h-4 w-4" />
			Logout
		</Button>
	);
};
export default LogoutButton;
