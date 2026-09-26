"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";

const SearchSection = () => {
	const [input, setInput] = useState("");

	const [, setSearch] = useQueryStates(
		{
			search: parseAsString.withDefault(""),
			page: parseAsInteger.withDefault(1),
		},
		{ shallow: false },
	);

	// Debounce the input value to avoid excessive updates
	const debouncedSearch = useDebounce(input, 500);
	useEffect(() => {
		setSearch({ search: debouncedSearch, page: 1 });
	}, [debouncedSearch, setSearch]);

	return (
		<div className="relative mb-8">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
			<Input
				placeholder="Search projects by title or description..."
				className="pl-10 h-12"
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
			/>
		</div>
	);
};
export default SearchSection;
