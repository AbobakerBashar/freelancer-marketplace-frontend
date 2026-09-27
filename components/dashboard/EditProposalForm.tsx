"use client";

import type { Proposal, ProposalInput } from "@/features/proposals/types";
import { proposalSchema } from "@/schemas/proposal";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { useUpdateProposal } from "@/features/proposals/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type EditProposalFormProps = {
	proposal: Proposal;
};

const EditProposalForm = ({ proposal }: EditProposalFormProps) => {
	const router = useRouter();

	const { mutateAsync: updateProposal, isPending: isUpdating } =
		useUpdateProposal();

	const form = useForm<ProposalInput>({
		resolver: zodResolver(proposalSchema),
		defaultValues: {
			coverLetter: proposal.coverLetter,
			bidAmount: proposal.bidAmount,
			deliveryDays: proposal.deliveryDays,
		},
	});

	const onSubmit = async (data: ProposalInput) => {
		if (isUpdating) return;

		const res = await updateProposal({
			data: { ...data, projectId: proposal.projectId },
			proposalId: proposal.id,
		});

		if (res.success) {
			toast.success("Proposal updated successfully");
			router.replace("/dashboard/my-proposals");
		} else {
			toast.error(res.message || "Failed to update proposal");
		}
	};

	return (
		<div className="lg:col-span-2">
			<Card>
				<CardHeader>
					<CardTitle>Edit Proposal</CardTitle>
					<CardDescription>
						Update your cover letter, budget, and delivery timeline.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="coverLetter"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cover Letter</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Explain why you're the perfect fit for this project..."
												className="min-h-50 resize-none"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{field.value?.length || 0} / 1000 characters
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="bidAmount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Proposed Budget</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Enter your proposed budget"
												step="0.01"
												min="0"
												value={field.value ?? ""}
												onChange={(e) => {
													const value = e.target.valueAsNumber;
													field.onChange(Number.isNaN(value) ? "" : value);
												}}
											/>
										</FormControl>
										<FormDescription>
											Enter your proposed budget in USD
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="deliveryDays"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Delivery Days</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Enter estimated delivery days"
												step="1"
												min="1"
												value={field.value ?? ""}
												onChange={(e) => {
													const value = e.target.valueAsNumber;
													field.onChange(Number.isNaN(value) ? "" : value);
												}}
											/>
										</FormControl>
										<FormDescription>
											How many days you need to deliver this project.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex gap-3 pt-4">
								<Button
									type="submit"
									size="lg"
									disabled={isUpdating}
									className="flex-1"
								>
									{isUpdating ? (
										<>
											<Loader className="mr-2 h-4 w-4 animate-spin" />
											Updating...
										</>
									) : (
										"Update Proposal"
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									size="lg"
									onClick={() => router.push("/dashboard/my-proposals")}
								>
									Cancel
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default EditProposalForm;
