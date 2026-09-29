"use client";

import { useQueryStates, parseAsString } from "nuqs";

import { Button } from "@/components/ui/button";
import { type Stats } from "@/features/projects/types";
import { formatStatus } from "@/utils/projects";

const FilterTabs = ({ stats }: { stats: Stats }) => {
	const [{ status }, setStatus] = useQueryStates(
		{ status: parseAsString },
		{ history: "push", shallow: false },
	);

	return (
		<div className="border rounded-2xl mb-4 p-4 flex flex-wrap gap-3">
			<Button
				variant={!status ? "secondary" : "outline"}
				className={`px-5 ${!status ? "border border-primary/25" : ""}`}
				onClick={() => setStatus({ status: null })}
			>
				All
			</Button>
			{stats.status.map((s) => {
				const statusLabel = formatStatus(s.status);
				return (
					<Button
						key={s.status}
						variant={status === s.status ? "secondary" : "outline"}
						className={`px-5 p-3 ${status === s.status ? "border border-primary/25" : ""}`}
						onClick={() => setStatus({ status: s.status })}
					>
						{statusLabel}
					</Button>
				);
			})}
		</div>
	);
};
export default FilterTabs;
