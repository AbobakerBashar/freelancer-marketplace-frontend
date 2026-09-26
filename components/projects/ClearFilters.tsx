"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ClearFilters = ({ className }: { className?: string }) => {
	const router = useRouter();
	return (
		<Button
			variant="outline"
			onClick={() => router.replace("/projects")}
			className={`px-5 ${className}`}
		>
			Clear Filters
		</Button>
	);
};
export default ClearFilters;
