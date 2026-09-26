"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignInUser } from "@/features/auth/hooks";
import { LoginInput, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";

export default function Signin() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
	});

	const { mutateAsync: signIn, isPending: isSigningIn } = useSignInUser();
	const [error, setError] = useState<Record<string, string> | null>(null);

	const router = useRouter();

	// Handle form submission
	const onSubmit = async (data: LoginInput) => {
		if (isSigningIn) return;

		const res = await signIn(data);

		if (res.success) router.replace("/");

		if (!res.success) {
			if (res.errors) setError(res.errors);
			else setError({ general: res.message });
		}
	};

	return (
		<section className="flex flex-1 flex-col items-center gap-24">
			<div>
				<h1 className="text-4xl font-bold">Welcome back!</h1>
				<p className="mt-4 text-lg text-gray-600">
					Sign in to continue to your account and manage your projects. Please
					fill in the form below to sign in.
				</p>
			</div>

			{error && (
				<div className="w-full p-4 bg-red-100 text-red-700 rounded -my-16">
					{error.general && <p>{error.general}</p>}
					{Object.keys(error).map((key) => {
						if (key !== "general") {
							return <p key={key}>{error[key]}</p>;
						}
						return null;
					})}
				</div>
			)}

			<Card className="w-full p-8">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full flex flex-col md:gap-2 lg:gap-3"
				>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" id="email" {...register("email")} required />

						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							type="password"
							id="password"
							{...register("password")}
							required
						/>

						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>

					<Button
						type="submit"
						disabled={isSigningIn}
						className="cursor-pointer w-full py-4 mt-4"
					>
						{isSigningIn ? (
							<>
								<Loader className="animate-spin" /> Signing in...
							</>
						) : (
							"Sign In"
						)}
					</Button>
				</form>
				<p className="flex gap-1">
					Do you need an account?
					<Link href="/auth/register" className="text-primary hover:underline">
						Register
					</Link>
				</p>
			</Card>
		</section>
	);
}
