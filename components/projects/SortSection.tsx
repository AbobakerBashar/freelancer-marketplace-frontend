"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const SortSection = () => {
	const [{ sort }, setParams] = useQueryStates(
		{
			sort: parseAsString.withDefault(""),
			order: parseAsString.withDefault(""),
			page: parseAsInteger,
		},
		{ shallow: false },
	);

	return (
		<Select
			onOpenChange={(value) => value}
			value={sort}
			onValueChange={(value) =>
				setParams(() => {
					const [sort, order] = value ? value.split("_") : [];
					return { sort, order, page: 1 };
				})
			}
		>
			<SelectTrigger className="w-45">Sort By</SelectTrigger>

			<SelectContent>
				<SelectItem value="budgetMax_desc">MAX Budget (High to Low)</SelectItem>
				<SelectItem value="budgetMax_asc">MAX Budget (Low to High)</SelectItem>
				<SelectItem value="budgetMin_desc">MIN Budget (High to Low)</SelectItem>
				<SelectItem value="budgetMin_asc">MIN Budget (Low to High)</SelectItem>
				<SelectItem value="deadline_desc">Deadline (Latest first)</SelectItem>
				<SelectItem value="deadline_asc">Deadline (Soonest first)</SelectItem>
			</SelectContent>
		</Select>
	);
};
export default SortSection;
