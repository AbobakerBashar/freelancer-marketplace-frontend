"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { changeEmailSchema, changePasswordSchema } from "@/schemas/auth";
import { useChangeEmail, useChangePassword } from "@/features/auth/hooks";
import { useRouter } from "next/navigation";

type Props = {
	children?: React.ReactNode;
	label: string;
	value: string;
	description?: string;
	action?: string;
	change?: string;
	setChange?: React.Dispatch<React.SetStateAction<string>>;
};

function SettingItem({
	label,
	value,
	action,
	children,
	change,
	setChange,
}: Props) {
	return (
		<div className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/20 px-3 py-3">
			{change === label.toLocaleLowerCase() ? (
				<ChangeArea
					label={
						label.toLocaleLowerCase() === "password" ? "password" : "email"
					}
					setChange={setChange}
				/>
			) : (
				<>
					<div className="flex min-w-0 items-center gap-3">
						<span className="grid size-9 shrink-0 place-items-center rounded-lg bg-background text-muted-foreground">
							{children}
						</span>
						<div className="min-w-0">
							<p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
								{label}
							</p>
							<p className="mt-1 truncate text-sm font-medium text-foreground">
								{value}React
							</p>
						</div>
					</div>
					{action && (
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								if (action === "Change") {
									setChange?.(label.toLocaleLowerCase());
								}
							}}
						>
							{action}
							<ChevronRight className="size-3.5" />
						</Button>
					)}
				</>
			)}
		</div>
	);
}

export default SettingItem;

function ChangeArea({
	setChange,
	label,
}: {
	label: "email" | "password";
	setChange?: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [newValue, setNewValue] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState<{
		newPassword?: string;
		confirmPassword?: string;
		newEmail?: string;
	}>({});

	const router = useRouter();

	const { mutateAsync: changeEmail, isPending: isChangingEmail } =
		useChangeEmail();
	const { mutateAsync: changePassword, isPending: isChangingPassword } =
		useChangePassword();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewValue(e.target.value);
	};

	// Handle save email function to validate and save the new email
	const handleSaveEmail = async () => {
		const validateResult = changeEmailSchema.safeParse({
			newEmail: newValue,
		});

		if (!validateResult.success) {
			setErrors({
				newEmail: validateResult.error.format().newEmail?._errors[0],
			});
			return;
		}

		const res = await changeEmail(newValue);

		if (!res.success) {
			setErrors({
				newEmail: res.errors?.newEmail || res.message,
			});
			return;
		} else {
			router.refresh(); // Refresh the page to reflect the updated email
			setChange?.(""); // Reset the change state to hide the input field
		}
	};

	// Handle save password function to validate and save the new password
	const handleSavePassword = async () => {
		const validateResult = changePasswordSchema.safeParse({
			newPassword: newValue,
			confirmPassword: confirmPassword,
		});

		if (!validateResult.success) {
			setErrors({
				newPassword: validateResult.error.format().newPassword?._errors[0],
				confirmPassword:
					validateResult.error.format().confirmPassword?._errors[0],
			});
			return;
		}

		const res = await changePassword(newValue);
		if (!res.success) {
			setErrors({
				newPassword: res.errors?.newPassword || res.message,
			});
			return;
		} else {
			router.refresh(); // Refresh the page to reflect the updated password
			setChange?.(""); // Reset the change state to hide the input field
		}
	};

	// Handle save
	const handleSave = async () => {
		if (isChangingEmail || isChangingPassword) return; // Prevent multiple submissions while the mutation is in progress

		setErrors({}); // Clear previous errors

		if (label === "email") {
			await handleSaveEmail();
		} else if (label === "password") {
			await handleSavePassword();
		}
	};

	return (
		<div className="flex w-full flex-col gap-2 rounded-xl border border-border/70 bg-muted/20 px-3 py-3">
			<p className="text-sm font-medium text-foreground">Change your {label}</p>

			<Input
				type={label}
				value={newValue}
				placeholder={`Enter new ${label.toLowerCase()}`}
				onChange={handleInputChange}
			/>
			{errors.newEmail && label === "email" && (
				<p className="text-destructive">{errors.newEmail}</p>
			)}
			{errors.newPassword && label === "password" && (
				<p className="text-destructive">{errors.newPassword}</p>
			)}

			{label === "password" && (
				<>
					<Input
						type={label}
						value={confirmPassword}
						placeholder={`Confirm new ${label.toLowerCase()}`}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					{errors.confirmPassword && (
						<p className="text-destructive">{errors.confirmPassword}</p>
					)}
				</>
			)}
			<div className="flex gap-2 mt-5">
				<Button
					type="button"
					disabled={isChangingEmail || isChangingPassword}
					variant="outline"
					className="px-7"
					onClick={() => setChange?.("")}
				>
					Cancel
				</Button>
				<Button type="button" className="px-7" onClick={handleSave}>
					{isChangingEmail || isChangingPassword ? "Saving..." : "Save"}
				</Button>
			</div>
		</div>
	);
}
