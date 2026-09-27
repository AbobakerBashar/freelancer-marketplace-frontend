import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

type LogoutButtonProps = {
	className?: string;
};

const LogoutButton = ({ className }: LogoutButtonProps) => {
	return (
		<Button variant="destructive" className={className}>
			<LogOut className="mr-2 h-4 w-4" />
			Logout
		</Button>
	);
};
export default LogoutButton;
