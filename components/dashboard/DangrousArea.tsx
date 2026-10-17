"use client";
import { useEffect, useState } from "react";

import { CardFooter } from "@/components/ui/card";
import { useDeactivateAccount } from "@/features/auth/hooks";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { socket } from "@/utils/socket";
import { signOutUser } from "@/features/auth/api";
import { useRouter } from "next/navigation";

const DangrousArea = () => {
	const [activeModal, setActiveModal] = useState<"deactivate" | "delete" | "">(
		"",
	);

	return (
		<>
			<CardFooter className="border-destructive/70 bg-muted/20 px-3 py-8 flex-col gap-4 items-start">
				<h3 className="text-lg font-semibold flex items-center gap-2">
					<Info className="h-6 w-6 text-destructive" />
					Danger Zone
				</h3>
				{/* Deactivate & Delete Account */}
				<p className="text-muted-foreground text-sm">
					Please note that deactivating your account will hide your profile and
					remove your access to the platform, while deleting your account is
					permanent and cannot be undone.
				</p>

				<div className="flex gap-4">
					<Button
						onClick={() => setActiveModal("deactivate")}
						variant="destructive"
					>
						Deactivate Account
					</Button>
					<Button
						onClick={() => setActiveModal("delete")}
						className="bg-destructive hover:bg-destructive/80"
					>
						Delete Account
					</Button>
				</div>
			</CardFooter>
			{activeModal && (
				<ConfirmationModal
					onCancel={() => setActiveModal("")}
					action={activeModal}
				/>
			)}
		</>
	);
};

export default DangrousArea;

function ConfirmationModal({
	onCancel,
	action,
}: {
	onCancel: () => void;
	action: "deactivate" | "delete";
}) {
	const router = useRouter();

	const [error, setError] = useState<string | null>(null);
	const { mutateAsync: mutateDeactivate, isPending: isDeactivatePending } =
		useDeactivateAccount();

	// Stop scrolling when the modal is open
	useEffect(() => {
		if (typeof window === "undefined") return;

		if (action === "deactivate" || action === "delete") {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [action]);

	const handleConfirm = async () => {
		if (isDeactivatePending) return; // Prevent multiple clicks while the mutation is in progress

		setError(null); // Reset error state before attempting the action

		// Handle the action based on the type (deactivate or delete)
		if (action === "deactivate") {
			const response = await mutateDeactivate();

			if (!response.success) {
				setError(
					response.message ||
						"An error occurred while deactivating your account.",
				);
				return;
			} else {
				// Disconnect the socket connection if needed
				socket.disconnect();
				// Log the user out or redirect to a sign-in page
				await signOutUser();
				router.refresh(); // Refresh the page to update the UI after logout
				router.replace("/auth/signin"); // Redirect to the sign-in page after logout
			}
		} else if (action === "delete") {
			toast.error("Delete account functionality is not implemented yet.");
		}

		onCancel(); // Close the modal after the action is completed
	};
	console.log("isDeactivatePending:", action, isDeactivatePending);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
			{/* Modal content */}
			<div className="bg-white rounded-lg p-6 w-full max-w-md space-y-6">
				{error && <div className="text-sm text-destructive">{error}</div>}
				{!error && (
					<p className="text-sm text-muted-foreground">
						Are you sure you want to {action} your account?
					</p>
				)}
				<div className="flex gap-4">
					<Button
						variant="destructive"
						onClick={handleConfirm}
						disabled={isDeactivatePending}
					>
						{isDeactivatePending && "Processing..."}
						{!isDeactivatePending && error ? "Retry" : "Confirm"}
					</Button>
					<Button variant="outline" onClick={onCancel}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}
