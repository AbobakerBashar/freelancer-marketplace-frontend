import EditProfileForm from "@/components/dashboard/EditProfileForm";
import { getUser } from "@/features/auth/api";
import { ArrowLeft, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Edit Profile",
	description: "Update your profile information",
};

const EditProfilePage = async () => {
	const response = await getUser();

	if (!response.success || !response.user) {
		redirect("/auth/signin");
	}

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-10 sm:py-12">
			<Link
				href="/dashboard/profile"
				className="mb-8 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-muted"
			>
				<ArrowLeft className="size-4" />
				Back to profile
			</Link>
			<section className="mb-8">
				<div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
					<UserRound className="size-5" />
				</div>
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
					Edit your profile
				</h1>
				<p className="mt-2 text-muted-foreground">
					Update the details shown on your marketplace profile.
				</p>
			</section>
			<EditProfileForm user={response.user} />
		</main>
	);
};

export default EditProfilePage;
