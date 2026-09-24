"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Link from "next/dist/client/link";

import { useRegisterUser } from "@/hooks/auth";
import { RegisterInput, registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Loader } from "lucide-react";

export default function Register() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			role: "FREELANCER",
		},
	});

	const [error, setError] = useState<Record<string, string> | null>(null);

	const { mutateAsync: registerUserAsync, isPending: isRegistering } =
		useRegisterUser();

	const router = useRouter();

	// Handle form submission
	const onSubmit = async (data: RegisterInput) => {
		if (isRegistering) return;

		const res = await registerUserAsync(data);

		if (res.success) router.replace("/");

		if (!res.success) {
			if (res.errors) setError(res.errors);
			else setError({ general: res.message });
		}
	};

	return (
		<section className="flex h-full flex-1 w-full max-w-2xl flex-col items-center justify-center gap-8 md:gap-5">
			<div>
				<h1 className="text-4xl font-bold">Create your account </h1>
				<p className="mt-4 text-lg text-gray-600">
					Join our community and start your journey with us. Please fill in the
					form below to create your account.
				</p>
			</div>
			{error && (
				<div className="mt-4 w-full p-4 bg-red-100 text-red-700 rounded">
					{error.general && <p>{error.general}</p>}
					{Object.keys(error).map((key) => {
						if (key !== "general") {
							return <p key={key}>{error[key]}</p>;
						}
						return null;
					})}
				</div>
			)}
			<Card className="w-full px-8 py-4">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex flex-col md:gap-2 lg:gap-3"
				>
					<div className="space-y-2">
						<Label htmlFor="name">Full name</Label>
						<Input type="text" id="name" {...register("name")} />

						{errors.name && (
							<p className="text-sm text-red-500">{errors.name.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" id="email" {...register("email")} />

						{errors.email && (
							<p className="text-sm text-red-500">{errors.email.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input type="password" id="password" {...register("password")} />

						{errors.password && (
							<p className="text-sm text-red-500">{errors.password.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							type="password"
							id="confirmPassword"
							{...register("confirmPassword")}
						/>

						{errors.confirmPassword && (
							<p className="text-sm text-red-500">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="role">Role</Label>
						<Controller
							name="role"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a role" />
									</SelectTrigger>

									<SelectContent>
										<SelectItem value="FREELANCER">Freelancer</SelectItem>
										<SelectItem value="CLIENT">Client</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>

						{errors.role && (
							<p className="text-sm text-red-500">{errors.role.message}</p>
						)}
					</div>
					<Button
						type="submit"
						className="cursor-pointer w-full py-4 mt-4 md:mt-0"
					>
						{isRegistering ? (
							<>
								<Loader className="animate-spin" /> Signing up...
							</>
						) : (
							"Register"
						)}
					</Button>
				</form>
				<p className="flex gap-1">
					Already have an account?
					<Link href="/auth/signin" className="text-primary hover:underline">
						Sign In
					</Link>
				</p>
			</Card>
		</section>
	);
}
