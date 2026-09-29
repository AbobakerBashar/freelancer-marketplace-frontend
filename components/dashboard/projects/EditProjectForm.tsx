"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEditProject } from "@/features/projects/hooks";
import {
	Project,
	ProjectEditFormInput,
	ProjectEditFormOutput,
	ProjectFormInput,
} from "@/features/projects/types";
import { projectEditSchema } from "@/schemas/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

const getDefaultValues = (project: Project): ProjectFormInput => ({
	title: project.title,
	description: project.description,
	category: project.category,
	skills: project.skills.length ? project.skills : [""],
	budgetType: project.budgetType ?? "FIXED",
	budgetMin: project.budgetMin,
	budgetMax: project.budgetMax,
	currency: project.currency ?? "USD",
	duration: project.duration,
	durationUnit: project.durationUnit ?? undefined,
	status: project.status ?? undefined,
	deadline: project.deadline
		? new Date(project.deadline).toISOString().split("T")[0]
		: "",
});

type EditProjectFormProps = {
	project: Project;
};

const EditProjectForm = ({ project }: EditProjectFormProps) => {
	const router = useRouter();

	const { mutateAsync: editProject, isPending: isSubmitting } =
		useEditProject();

	const form = useForm<ProjectEditFormInput, unknown, ProjectEditFormOutput>({
		resolver: zodResolver(projectEditSchema),
		defaultValues: getDefaultValues(project),
	});

	const skillValues = useWatch({
		control: form.control,
		name: "skills",
	}) ?? [""];

	const updateSkill = (index: number, value: string) => {
		const next = [...skillValues];
		next[index] = value;
		form.setValue("skills", next, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const addSkill = () => {
		form.setValue("skills", [...skillValues, ""], {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const removeSkill = (index: number) => {
		const next = [...skillValues];
		next.splice(index, 1);
		form.setValue("skills", next.length ? next : [""], {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	const onSubmit = async (data: ProjectEditFormOutput) => {
		if (isSubmitting) return;

		const res = await editProject({
			projectData: data,
			projectId: project.id,
		});

		if (res.success) {
			toast.success("Project updated successfully!");
			router.push("/dashboard/my-projects");
		} else {
			if (res.errors) {
				Object.entries(res.errors).forEach(([field, message]) => {
					form.setError(field as keyof ProjectFormInput, {
						type: "manual",
						message: message as string,
					});
				});
			} else {
				toast.error(
					res.message || "An error occurred while creating the project.",
				);
			}
		}
	};

	return (
		<CardContent>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										placeholder="E.g. Build a small SaaS landing page"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Describe the project, goals, deliverables, and timeline."
										className="min-h-32 resize-none"
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

					<div className="grid gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Input placeholder="Web Development" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="currency"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Currency</FormLabel>
									<FormControl>
										<Input placeholder="USD" maxLength={3} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormItem>
						<FormLabel>Skills</FormLabel>
						<div className="space-y-3">
							{skillValues.map((skill: string, index: number) => (
								<div key={index} className="flex gap-2">
									<Input
										placeholder={index === 0 ? "React" : "Add another skill"}
										value={skill ?? ""}
										onChange={(e) => updateSkill(index, e.target.value)}
									/>
									{skillValues.length > 1 && (
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => removeSkill(index)}
										>
											Remove
										</Button>
									)}
								</div>
							))}
						</div>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={addSkill}
						>
							Add Skill
						</Button>
						<FormMessage>
							{form.formState.errors.skills?.message as string | undefined}
						</FormMessage>
					</FormItem>

					<div className="grid gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="budgetType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Budget Type</FormLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a budget type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="FIXED">FIXED</SelectItem>
											<SelectItem value="HOURLY">HOURLY</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select
										value={field.value ?? "DRAFT"}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Choose status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="DRAFT">DRAFT</SelectItem>
											<SelectItem value="OPEN">OPEN</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid gap-6 md:grid-cols-3">
						<FormField
							control={form.control}
							name="budgetMin"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Min Budget</FormLabel>
									<FormControl>
										<Input
											type="number"
											min="0"
											step="0.01"
											value={typeof field.value === "number" ? field.value : ""}
											onChange={(e) => {
												const value = e.target.valueAsNumber;
												field.onChange(Number.isNaN(value) ? "" : value);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="budgetMax"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Max Budget</FormLabel>
									<FormControl>
										<Input
											type="number"
											min="0"
											step="0.01"
											value={typeof field.value === "number" ? field.value : ""}
											onChange={(e) => {
												const value = e.target.valueAsNumber;
												field.onChange(Number.isNaN(value) ? "" : value);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="deadline"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Deadline</FormLabel>
									<FormControl>
										<Input
											type="date"
											value={
												field.value &&
												typeof field.value === "object" &&
												field.value instanceof Date
													? new Date(field.value).toISOString().split("T")[0]
													: ""
											}
											onChange={(e) => {
												const parsed = e.target.value
													? new Date(e.target.value)
													: undefined;
												field.onChange(parsed);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="duration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Duration</FormLabel>
									<FormControl>
										<Input
											type="number"
											min="1"
											step="1"
											value={typeof field.value === "number" ? field.value : ""}
											onChange={(e) => {
												const value = e.target.valueAsNumber;
												field.onChange(Number.isNaN(value) ? undefined : value);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="durationUnit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Duration Unit</FormLabel>
									<Select
										value={field.value ?? ""}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select duration unit" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="HOURS">HOURS</SelectItem>
											<SelectItem value="DAYS">DAYS</SelectItem>
											<SelectItem value="WEEKS">WEEKS</SelectItem>
											<SelectItem value="MONTHS">MONTHS</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
						<div className="flex gap-3">
							<Button
								type="button"
								variant="outline"
								onClick={() => form.reset(getDefaultValues(project))}
							>
								Reset
							</Button>
							<Button
								type="button"
								variant="secondary"
								onClick={() => router.push("/dashboard/my-projects")}
							>
								Cancel
							</Button>
						</div>

						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<Loader className="mr-2 h-4 w-4 animate-spin" />
									Saving...
								</>
							) : (
								"Edit Project"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</CardContent>
	);
};
export default EditProjectForm;
