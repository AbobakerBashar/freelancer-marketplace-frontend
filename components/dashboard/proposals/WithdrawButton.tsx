"use client";

import { Button } from "@/components/ui/button";
import { useWithdraw } from "@/features/proposals/hooks";
import { Loader, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const WithdrawButton = ({ proposalId }: { proposalId: string }) => {
	const { mutateAsync: withdraw, isPending: isWthdrawing } = useWithdraw();

	const router = useRouter();

	const handleWithdraw = async () => {
		if (!proposalId || isWthdrawing) return;

		const res = await withdraw(proposalId);

		if (res.success) {
			toast.success(res.message);
			router.refresh();
		} else {
			toast.error(res.message);
		}
	};

	return (
		<Button
			disabled={isWthdrawing}
			variant="destructive"
			onClick={handleWithdraw}
		>
			{isWthdrawing ? (
				<>
					<Loader className="w-4 h-4 animate-spin" />
					Withdrawing
				</>
			) : (
				<>
					{" "}
					<Undo2 className="h-4 w-4" />
					Withdraw
				</>
			)}
		</Button>
	);
};

export default WithdrawButton;
