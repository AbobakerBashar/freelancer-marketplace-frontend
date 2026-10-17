import DangrousArea from "@/components/dashboard/DangrousArea";
import SensitiveSettings from "@/components/dashboard/SensitiveSettings";
import SettingItem from "@/components/dashboard/SettingItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getUser } from "@/features/auth/api";
import { format } from "date-fns";
import {
	Bell,
	CheckCircle2,
	Lock,
	Mail,
	Pencil,
	ShieldCheck,
	UserRound,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Account settings",
	description:
		"Manage your account preferences, security, and communication settings",
};

const AccountPage = async () => {
	const response = await getUser();

	if (!response.success || !response.user) {
		redirect("/auth/signin");
	}

	const { user } = response;
	const initials = user.name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0])
		.join("")
		.toUpperCase();

	const joinedDate = format(new Date(user.createdAt), "MMM d, yyyy");

	return (
		<main className="page-container min-h-screen bg-linear-to-b from-background to-muted/20 py-10 sm:py-12">
			<section className="mb-8 flex flex-col items-start gap-2 lg:gap-3 lg:flex-row lg:items-center lg:justify-between">
				<div>
					<Badge variant="outline" className="mb-3 gap-2 px-3 py-3">
						<ShieldCheck className="size-3.5" />
						Account settings
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Manage your account settings
					</h1>
					<p className="mt-2 max-w-2xl text-muted-foreground">
						Update your preferences, security settings, and contact details in
						one place.
					</p>
				</div>
				<div className="mt-5 flex gap-2 sm:mt-0">
					<Link href="/dashboard/profile/edit">
						<Button variant="outline" className="gap-2">
							<Pencil className="size-4" />
							Edit profile
						</Button>
					</Link>
					<Button className="gap-2">
						<Lock className="size-4" />
						Change password
					</Button>
				</div>
			</section>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
				<Card className="border-border/70 bg-card/90 flex flex-col gap-6 justify-between h-full">
					<CardContent className="px-6 space-y-6 sm:px-7">
						<div className="flex items-center gap-4">
							<Avatar
								aria-label={`${user.name}'s profile avatar`}
								role="img"
								className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-primary/10 text-xl font-semibold text-primary ring-6 ring-primary/5"
							>
								{user.avatarUrl ? (
									<AvatarImage
										src={user.avatarUrl}
										alt={`${user.name}'s profile avatar`}
										className="h-16 w-16"
									/>
								) : (
									<AvatarFallback>{initials || "U"}</AvatarFallback>
								)}
							</Avatar>
							<div>
								<h2 className="text-xl font-semibold">{user.name}</h2>
								<p className="text-sm text-muted-foreground">{user.email}</p>
							</div>
						</div>

						<div className="mt-6 flex flex-wrap gap-2">
							<Badge>
								{user.role === "FREELANCER" ? "Freelancer" : "Client"}
							</Badge>
							{user.isVerified && (
								<Badge variant="secondary" className="gap-1.5">
									<CheckCircle2 className="size-3.5 text-success" />
									Verified
								</Badge>
							)}
							<Badge variant="outline" className="gap-1.5">
								<span className="size-1.5 rounded-full bg-success" />
								{user.isActive === false ? "Inactive" : "Active"}
							</Badge>
						</div>

						<SensitiveSettings email={user.email} joinedDate={joinedDate} />
					</CardContent>

					<DangrousArea />
				</Card>

				<div className="space-y-6">
					<Card className="border-border/70 bg-card/90">
						<CardHeader className="border-b border-border/70">
							<CardTitle>Security</CardTitle>
							<CardDescription>
								Keep your account protected and review recent sign-in activity.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4 pt-6">
							<SettingItem
								label="Password"
								value="Last updated 2 months ago"
								action="Update"
							>
								<Lock className="size-4" />
							</SettingItem>

							<SettingItem
								label="Two-factor authentication"
								value={
									user.isVerified ? "Enabled for your account" : "Not enabled"
								}
								action={user.isVerified ? "Manage" : "Enable"}
							>
								<ShieldCheck className="size-4" />
							</SettingItem>

							<SettingItem
								label="Active sessions"
								value="3 devices currently signed in"
								action="Review"
							>
								<UserRound className="size-4" />
							</SettingItem>
						</CardContent>
					</Card>

					<Card className="border-border/70 bg-card/90">
						<CardHeader className="border-b border-border/70">
							<CardTitle>Preferences</CardTitle>
							<CardDescription>
								Choose how you hear from us and how your workspace feels.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-5 pt-6">
							<PreferenceRow
								label="Product updates"
								description="New features, improvements and release notes"
								defaultChecked
							/>
							<PreferenceRow
								label="Project reminders"
								description="Deadline and status reminders for your active work"
								defaultChecked
							/>
							<PreferenceRow
								label="Marketing emails"
								description="Promotions, content, and partner opportunities"
							/>
							<PreferenceRow
								label="Weekly summary"
								description="Digest of proposals, messages, and activity"
								defaultChecked
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
};

function PreferenceRow({
	label,
	description,
	defaultChecked = false,
}: {
	label: string;
	description: string;
	defaultChecked?: boolean;
}) {
	return (
		<div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-muted/20 px-3 py-3">
			<div className="min-w-0">
				<p className="text-sm font-medium text-foreground">{label}</p>
				<p className="mt-1 text-sm text-muted-foreground">{description}</p>
			</div>
			<Checkbox defaultChecked={defaultChecked} aria-label={label} />
		</div>
	);
}

export default AccountPage;
