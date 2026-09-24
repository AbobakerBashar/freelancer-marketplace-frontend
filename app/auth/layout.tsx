import Image from "next/image";

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
	return (
		<main className="flex min-h-screen justify-center px-8 py-6 lg:gap-8">
			<div className="hidden lg:block relative w-1/2 h-screen">
				<Image
					src="/svgs/auth.svg"
					alt="Authentication"
					fill
					className="w-full h-full lg:object-cover"
				/>
			</div>
			{children}
		</main>
	);
}
