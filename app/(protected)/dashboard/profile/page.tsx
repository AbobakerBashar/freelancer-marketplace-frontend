import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getUser } from "@/features/auth/api";
import { format } from "date-fns";
import type { LucideIcon } from "lucide-react";
import {
	CheckCircle2,
	Mail,
	MapPin,
	Pencil,
	Phone,
	ShieldCheck,
	UserRound,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Profile",
	description: "View your profile and account details",
};

const ProfilePage = async () => {
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
						<UserRound className="size-3.5" />
						Account profile
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Your profile
					</h1>
					<p className="mt-2 max-w-2xl text-muted-foreground">
						Manage the information clients and collaborators use to get to know
						you.
					</p>
				</div>
				<Link
					href="/dashboard/profile/edit"
					className="mt-5 inline-flex gap-2 bg-primary text-indigo-100 hover:text-indigo-50  hover:bg-primary/80 px-5 py-2 rounded-lg text-sm font-medium transition-colors sm:mt-0"
				>
					<Pencil className="size-4" />
					Edit profile
				</Link>
			</section>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
				<Card className="border-border/70 bg-card/90">
					<CardContent className="flex flex-col items-center px-6 py-8 text-center sm:px-8">
						<Avatar
							aria-label={`${user.name}'s profile avatar`}
							role="img"
							className="mb-5 grid w-32 h-32 place-items-center overflow-hidden rounded-full bg-primary/10 text-3xl font-semibold text-primary ring-8 ring-primary/5"
						>
							{user.avatarUrl ? (
								<AvatarImage
									src={user.avatarUrl}
									alt={`${user.name}'s profile avatar`}
									className="h-30 w-30"
								/>
							) : (
								<AvatarFallback>{initials || "U"}</AvatarFallback>
							)}
						</Avatar>
						<h2 className="text-2xl font-semibold">{user.name}</h2>
						<p className="mt-1 text-muted-foreground">{user.email}</p>
						<div className="mt-4 flex flex-wrap justify-center gap-2">
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
						<div className="mt-8 w-full border-t border-border/70 pt-6 text-left">
							<InfoRow
								icon={ShieldCheck}
								label="Member since"
								value={joinedDate}
							/>
							{user.bio ? (
								<div className="mt-6">
									<p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
										About
									</p>
									<p className="mt-2 leading-7 text-foreground/80">
										{user.bio}
									</p>
								</div>
							) : (
								<p className="mt-6 text-sm text-muted-foreground">
									Add a short bio to help people learn more about you.
								</p>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className="border-border/70 bg-card/90">
					<CardHeader className="border-b border-border/70">
						<CardTitle>Contact information</CardTitle>
						<CardDescription>
							Your account details and preferred contact information.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-5 pt-6 sm:grid-cols-2">
						<InfoRow
							icon={Mail}
							label="Email address"
							value={user.email}
							href={`mailto:${user.email}`}
						/>
						<InfoRow
							icon={Phone}
							label="Phone number"
							value={user.phone || "Not provided"}
							href={user.phone ? `tel:${user.phone}` : undefined}
						/>
						<InfoRow
							icon={MapPin}
							label="Location"
							value={user.location || "Not provided"}
						/>
						<InfoRow
							icon={UserRound}
							label="Account type"
							value={user.role === "FREELANCER" ? "Freelancer" : "Client"}
						/>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

function InfoRow({
	icon: Icon,
	label,
	value,
	href,
}: {
	icon: LucideIcon;
	label: string;
	value: string;
	href?: string;
}) {
	const content = (
		<>
			<span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
				<Icon className="size-4" />
			</span>
			<span className="min-w-0">
				<span className="block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
					{label}
				</span>
				<span className="mt-1 block truncate text-sm font-medium">{value}</span>
			</span>
		</>
	);

	return href ? (
		<a
			className="flex min-w-0 items-center gap-3 rounded-lg transition-colors hover:text-primary"
			href={href}
		>
			{content}
		</a>
	) : (
		<div className="flex min-w-0 items-center gap-3">{content}</div>
	);
}

export default ProfilePage;
