"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOutUser } from "@/features/auth/api";

type LogoutButtonProps = {
	className?: string;
};

const LogoutButton = ({ className }: LogoutButtonProps) => {
	const handleLogout = async () => {
		await signOutUser();
	};

	return (
		<Button variant="destructive" className={className} onClick={handleLogout}>
			<LogOut className="mr-2 h-4 w-4" />
			Logout
		</Button>
	);
};
export default LogoutButton;
