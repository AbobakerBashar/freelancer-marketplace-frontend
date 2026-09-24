"use server";

const COOKIE_OPTIONS: {
	httpOnly: boolean;
	secure: boolean;
	sameSite: "lax" | "none";
	maxAge: number;
} = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	maxAge: 3 * 24 * 60 * 60 * 1000,
};

import api from "@/lib/utils";
import { LoginInput, RegisterInput } from "@/schemas/auth";
import axios from "axios";
import { cookies } from "next/dist/server/request/cookies";

export const registerUser = async (data: RegisterInput) => {
	const cookieStore = await cookies();

	try {
		const response = await api.post("/auth/register", data);

		cookieStore.set("jwt", response.data.token, COOKIE_OPTIONS);

		return {
			success: true,
			message: "User registered successfully.",
			user: response.data.user,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data) return error.response?.data;
			else
				return {
					success: false,
					message: "An error occurred while registering the user.",
				};
		}
		return {
			success: false,
			message: "An error occurred while registering the user.",
		};
	}
};

export const signInUser = async (data: LoginInput) => {
	const cookieStore = await cookies();

	try {
		const response = await api.post("/auth/signin", data);

		cookieStore.set("jwt", response.data.token, COOKIE_OPTIONS);

		return {
			success: true,
			message: "User signed in successfully.",
			user: response.data.user,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data) return error.response?.data;
			else
				return {
					success: false,
					message: "An error occurred while registering the user.",
				};
		}
		return {
			success: false,
			message: "An error occurred while registering the user.",
		};
	}
};
