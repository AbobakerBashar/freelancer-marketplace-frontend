"use client";

import SettingItem from "@/components/dashboard/SettingItem";
import { Bell, Lock, Mail, UserRound } from "lucide-react";
import { useState } from "react";

const SensitiveSettings = ({
	email,
	joinedDate,
}: {
	email: string;
	joinedDate: string;
}) => {
	const [change, setChange] = useState("");

	return (
		<div className="mt-6 space-y-3 border-t border-border/70 pt-6">
			<SettingItem
				label="Primary email"
				value={email}
				action="Change"
				change={change}
				setChange={setChange}
			>
				<Mail className="size-4" />
			</SettingItem>
			<SettingItem
				label="Password"
				value="Last updated 2 months ago"
				action="Change"
				change={change}
				setChange={setChange}
			>
				<Lock className="size-4" />
			</SettingItem>

			<SettingItem label="Member since" value={joinedDate}>
				<UserRound className="size-4" />
			</SettingItem>

			<SettingItem
				label="Contact preferences"
				value="Email and notifications enabled"
				action="Manage"
			>
				<Bell className="size-4" />
			</SettingItem>
		</div>
	);
};

export default SensitiveSettings;
