import type { Category, ProjectQueryParams } from "@/features/projects/types";
import { Label } from "../ui/label";
import ClearFilters from "./ClearFilters";
import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

type Props = {
	categories: Category[];
	params: ProjectQueryParams;
	setParams: (params: ProjectQueryParams) => void;
};

const MobileFilters = ({ categories, params, setParams }: Props) => {
	const [open, setOpen] = useState(false);

	const { category, budgetType } = params;

	return (
		<div className="md:hidden">
			<Dialog open={open} onOpenChange={() => setOpen(false)}>
				<DialogHeader className="w-fit">
					<Button
						variant="outline"
						className="mb-4"
						onClick={() => setOpen(true)}
					>
						<Filter className="w-5 h-5" /> Filters
					</Button>
				</DialogHeader>
				<DialogContent>
					{/* Filter Controls */}
					<div className="flex gap-4 flex-col">
						<h6>Category:</h6>
						<Label className="text-secondary-foreground text-xs">
							<Checkbox
								className="cursor-pointer"
								checked={!category}
								onCheckedChange={(checked) =>
									checked && setParams({ category: "", page: 1 })
								}
							/>
							All
						</Label>
						{categories.map((cat) => (
							<Label
								key={cat.category}
								className="text-secondary-foreground text-xs"
							>
								<Checkbox
									className="cursor-pointer"
									checked={category === cat.category}
									onCheckedChange={(checked) =>
										checked && setParams({ category: cat.category, page: 1 })
									}
								/>
								{cat.category}
							</Label>
						))}
					</div>

					<div className="flex flex-col gap-2">
						<h6>Budget Type:</h6>
						<Label className="flex gap-4 items-center text-secondary-foreground text-xs">
							<Checkbox
								className="cursor-pointer"
								id="fixed"
								checked={!budgetType}
								onCheckedChange={(checked) =>
									checked && setParams({ budgetType: undefined, page: 1 })
								}
							/>
							All
						</Label>
						<Label className="flex gap-4 items-center text-secondary-foreground text-xs">
							<Checkbox
								className="cursor-pointer"
								checked={budgetType === "FIXED"}
								onCheckedChange={(checked) =>
									checked && setParams({ budgetType: "FIXED", page: 1 })
								}
							/>
							Fixed
						</Label>
						<Label className="flex gap-4 items-center text-secondary-foreground text-xs">
							<Checkbox
								className="cursor-pointer"
								checked={budgetType === "HOURLY"}
								onCheckedChange={(checked) =>
									checked && setParams({ budgetType: "HOURLY", page: 1 })
								}
							/>
							Hourly
						</Label>
					</div>

					<div className="flex flex-col gap-2">
						<h6>Status:</h6>
						<Label className="flex gap-4 items-center text-secondary-foreground text-xs">
							<Checkbox
								className="cursor-pointer"
								checked={!status}
								onCheckedChange={(checked) =>
									checked &&
									setParams({
										status: undefined,
										page: 1,
									})
								}
							/>
							All
						</Label>
						<Label className="flex gap-4 items-center text-secondary-foreground text-xs">
							<Checkbox
								className="cursor-pointer"
								checked={status === "OPEN"}
								onCheckedChange={(checked) =>
									checked &&
									setParams({
										status: "OPEN",
										page: 1,
									})
								}
							/>
							Open
						</Label>
						<Label className="flex gap-4 items-center text-secondary-foreground text-xs">
							<Checkbox
								className="cursor-pointer"
								checked={status === "DRAFT"}
								onCheckedChange={(checked) =>
									checked &&
									setParams({
										status: "DRAFT",
										page: 1,
									})
								}
							/>
							Draft
						</Label>
					</div>
					<ClearFilters />
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default MobileFilters;
