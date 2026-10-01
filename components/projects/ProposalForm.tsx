"use client";

import type { ProposalInput } from "@/features/proposals/types";
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

import { useSubmitProposal } from "@/features/proposals/hooks";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";

type ProposalFormProps = {
	projectId: string;
};

const ProposalForm = ({ projectId }: ProposalFormProps) => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const { mutateAsync: submitProposal, isPending: isSubmitting } =
		useSubmitProposal();

	const form = useForm<ProposalInput>({
		resolver: zodResolver(proposalSchema),
		defaultValues: {
			coverLetter: "",
			bidAmount: 0,
			deliveryDays: 0,
		},
	});

	const onSubmit = async (data: ProposalInput) => {
		if (isSubmitting) return;

		const res = await submitProposal({ data, projectId });

		if (res.success) {
			toast.success("Proposal submitted successfully!");
			router.refresh();
			router.replace(`/dashboard/my-proposals/${res.proposal?.id}/view`);
		} else {
			if (res.errors) {
				Object.entries(res.errors).forEach(([field, message]) => {
					form.setError(field as keyof ProposalInput, {
						type: "manual",
						message: message as string,
					});
				});
			}

			if (res.message) setError(res.message);
		}
	};

	return (
		<div className="lg:col-span-2">
			<Card>
				<CardHeader>
					<CardTitle>Proposal Details</CardTitle>
					<CardDescription>
						Fill in all the details to submit your proposal
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Cover Letter */}
							<FormField
								control={form.control}
								name="coverLetter"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cover Letter</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Explain why you're the perfect fit for this project. Share your relevant experience, skills, and approach..."
												className="min-h-50 resize-none"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{field.value?.length || 0} / 2000 characters
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Proposed Budget */}
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

							{/* Delivery Days */}
							<FormField
								control={form.control}
								name="deliveryDays"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Delivery Days</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Enter your proposed budget"
												step="1"
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

							{/* Display general error message if any */}
							{error && <p className="text-sm text-destructive">{error}</p>}

							{/* Submit Button */}
							<div className="flex gap-3 pt-4">
								<Button
									type="submit"
									size="lg"
									disabled={isSubmitting}
									className="flex-1"
								>
									{isSubmitting ? (
										<>
											<Loader className="mr-2 h-4 w-4 animate-spin" />
											Submitting...
										</>
									) : (
										"Submit Proposal"
									)}
								</Button>
								<Button
									type="button"
									variant="outline"
									size="lg"
									onClick={() => router.push(`/projects/${projectId}`)}
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
export default ProposalForm;
