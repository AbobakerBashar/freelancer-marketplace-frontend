"use client";

import type { User } from "@/features/auth/types";
import { profileSchema, type ProfileFormInput } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useUpdateProfile, useUpdateAvatar } from "@/features/auth/hooks";

const EditProfileForm = ({ user }: { user: User }) => {
	const router = useRouter();
	const form = useForm<ProfileFormInput>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user.name,
			bio: user.bio || "",
			phone: user.phone || "",
			location: user.location || "",
		},
	});

	const { mutateAsync: updateProfile, isPending: isUpdating } =
		useUpdateProfile();
	const { mutateAsync: updateAvatar, isPending: isUpdatingAvatar } =
		useUpdateAvatar();

	const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl || "");

	// Clean up the object URL when the component unmounts or when the avatarPreview changes
	useEffect(() => {
		return () => {
			if (avatarPreview.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
		};
	}, [avatarPreview]);

	// Handle updat avatar
	const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file || isUpdatingAvatar) return;

		if (!file.type.startsWith("image/")) {
			toast.error("Please choose an image file.");
			event.target.value = "";
			return;
		}

		if (avatarPreview.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
		setAvatarPreview(URL.createObjectURL(file));

		// Create a FormData object to send the file
		const formData = new FormData();
		formData.append("avatar", file);

		const res = await updateAvatar(formData);

		if (!res.success) {
			toast.error(res.message || "Failed to update avatar.");

			if (avatarPreview.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
			setAvatarPreview(user.avatarUrl || "");

			return;
		}

		toast.success("Avatar updated successfully.");
		router.refresh();
		if (avatarPreview.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
		setAvatarPreview(res.user?.avatarUrl || "");
	};

	// Handle form submission
	const onSubmit = async (data: ProfileFormInput) => {
		if (isUpdating) return;

		const response = await updateProfile({
			...data,
			name: data.name ? data.name : undefined,
		});

		if (!response.success) {
			if (response.errors)
				for (const [field, message] of Object.entries(response.errors)) {
					form.setError(field as keyof ProfileFormInput, {
						type: "manual",
						message,
					});
				}

			return;
		}

		toast.success("Profile updated successfully.");
		router.refresh();
		form.reset({
			name: response.user?.name || "",
			bio: response.user?.bio || "",
			phone: response.user?.phone || "",
			location: response.user?.location || "",
		});
	};

	return (
		<div className="space-y-6">
			<Card className="border-border/70 bg-card/90">
				<CardHeader className="border-b border-border/70">
					<CardTitle>Profile photo</CardTitle>
					<CardDescription>
						Choose an image to use as your public profile avatar.
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-6">
					<form className="flex flex-col gap-6 sm:flex-row sm:items-center">
						<Avatar
							className="h-32 w-32 ring-8 inline-flex items-center justify-center ring-primary/5"
							aria-label={`${user.name}'s profile avatar preview`}
						>
							{avatarPreview ? (
								<AvatarImage
									src={avatarPreview}
									alt={`${user.name}'s profile avatar preview`}
								/>
							) : (
								<AvatarFallback className="text-2xl w-24 h-24">
									{getInitials(user.name)}
								</AvatarFallback>
							)}
						</Avatar>
						<div className="space-y-2">
							<Label
								htmlFor="avatar"
								className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-primary px-2.5 text-sm text-primary-foreground transition-colors hover:bg-primary/80"
							>
								{isUpdatingAvatar ? (
									<>
										<Loader2 className="size-4 animate-spin" />
										Uploading...
									</>
								) : (
									<>
										<ImagePlus className="size-4" />
										Choose image
									</>
								)}
							</Label>
							<Input
								id="avatar"
								type="file"
								accept="image/*"
								onChange={handleAvatarChange}
								className="sr-only"
							/>
							<p className="text-sm text-muted-foreground">
								PNG, JPG, or GIF. Select an image to preview it.
							</p>
						</div>
					</form>
				</CardContent>
			</Card>

			<Card className="border-border/70 bg-card/90">
				<CardHeader className="border-b border-border/70">
					<CardTitle>Edit profile</CardTitle>
					<CardDescription>
						Keep your public profile details up to date.
					</CardDescription>
				</CardHeader>
				<CardContent className="pt-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Full name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="location"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Location</FormLabel>
											<FormControl>
												<Input placeholder="e.g. Cairo, Egypt" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone number</FormLabel>
											<FormControl>
												<Input
													type="tel"
													placeholder="+20 100 000 0000"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="space-y-2">
									<FormLabel>Email address</FormLabel>
									<Input value={user.email} disabled />
									<p className="text-sm text-muted-foreground">
										Email changes require account verification.
									</p>
								</div>
							</div>
							<FormField
								control={form.control}
								name="bio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bio</FormLabel>
										<FormControl>
											<Textarea
												className="min-h-32 resize-y"
												placeholder="Tell clients a little about yourself..."
												{...field}
											/>
										</FormControl>
										<FormDescription>
											{field.value?.length || 0} / 250 characters
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
								<Button
									type="button"
									variant="outline"
									disabled={isUpdating}
									size="lg"
									onClick={() => router.push("/dashboard/profile")}
									className="px-5 md:px-7"
								>
									Cancel
								</Button>
								<Button
									size="lg"
									type="submit"
									disabled={isUpdating}
									className="px-5 md:px-7"
								>
									{form.formState.isSubmitting && (
										<Loader2 className="animate-spin" />
									)}
									{form.formState.isSubmitting ? "Saving..." : "Save changes"}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

function getInitials(name: string) {
	return (
		name
			.split(" ")
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0])
			.join("")
			.toUpperCase() || "U"
	);
}

export default EditProfileForm;
