"use client";

import type {
	Pagination as PaginationType,
	ProjectQueryParams,
} from "@/features/projects/types";

type Props = {
	pagination: PaginationType | null;
	setParams: (params: ProjectQueryParams) => void;
};

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";
import ClearFilters from "./ClearFilters";

const PaginationSection = ({ pagination, setParams }: Props) => {
	const { currentPage, totalPages } = pagination || {
		currentPage: 1,
		totalPages: 1,
		totalCount: 0,
	};

	return (
		<>
			{pagination && (
				<Pagination className="px-4 py-8">
					<PaginationContent>
						<PaginationPrevious
							isActive={currentPage === 1}
							className={`${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
							text="Previous"
							onClick={() => {
								if (currentPage > 1) {
									setParams({ page: currentPage - 1 });
								}
							}}
						/>
						{[...Array(totalPages || 1)].map((_, index) => (
							<PaginationItem key={index}>
								<PaginationLink
									isActive={currentPage === index + 1}
									onClick={() => setParams({ page: index + 1 })}
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationNext
							isActive={currentPage === totalPages}
							className={`${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
							onClick={() =>
								currentPage < totalPages && setParams({ page: currentPage + 1 })
							}
							text="Next"
						/>
					</PaginationContent>
					{/* </div> */}
				</Pagination>
			)}

			<div className="md:hidden flex justify-center">
				<ClearFilters />
			</div>
		</>
	);
};
export default PaginationSection;
