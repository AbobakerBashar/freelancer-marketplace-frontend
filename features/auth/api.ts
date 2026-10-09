"use server";

const COOKIE_OPTIONS: {
	httpOnly: boolean;
	secure: boolean;
	sameSite: "lax" | "none";
	maxAge: number;
	path: "/";
} = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	maxAge: 3 * 24 * 60 * 60 * 1000,
	path: "/",
};

import { LoginInput, RegisterInput } from "@/schemas/auth";
import api from "@/utils/api";
import { getAuthToken } from "@/utils/auth";
import axios from "axios";
import { cookies } from "next/headers";
import type { AuthResponse } from "./types";
import { ProfileFormInput } from "@/schemas/profile";

export const getUser = async (): Promise<AuthResponse> => {
	try {
		const token = await getAuthToken();
		if (!token) {
			return {
				success: false,
				message: "No token found.",
				user: null,
			};
		}

		const response = await api.get("/auth/me", {
			headers: {
				cookie: `jwt=${token}`,
			},
		});

		return {
			success: true,
			message: "User fetched successfully.",
			user: response.data.user,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data) return error.response?.data;
			else
				return {
					success: false,
					message: "An error occurred while fetching the user.",
					user: null,
				};
		}
		return {
			success: false,
			message: "An error occurred while fetching the user.",
			user: null,
		};
	}
};

export const updateProfile = async (
	data: ProfileFormInput,
): Promise<AuthResponse> => {
	try {
		const token = await getAuthToken();
		if (!token) {
			return { success: false, message: "No token found.", user: null };
		}

		const response = await api.patch("/auth/update", data, {
			headers: { cookie: `jwt=${token}` },
		});

		return {
			success: true,
			message: "Profile updated successfully.",
			user: response.data.user,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.errors)
				return {
					user: null,
					errors: error.response.data.errors,
					success: false,
				};

			return {
				success: false,
				message:
					error.response?.data?.message ||
					"An error occurred while updating your profile.",
				user: null,
			};
		}

		return {
			success: false,
			message: "An error occurred while updating your profile.",
			user: null,
		};
	}
};

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
					message:
						error.response?.data?.message ||
						"An error occurred while registering the user.",
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
					message:
						error.response?.data?.message ||
						"An error occurred while signing in the user.",
				};
		}
		return {
			success: false,
			message: "An error occurred while signing in the user.",
		};
	}
};

export const signOutUser = async () => {
	const cookieStore = await cookies();
	cookieStore.delete("jwt");
};

export const updateUserAvatar = async (
	data: FormData,
): Promise<AuthResponse> => {
	try {
		const token = await getAuthToken();
		if (!token) {
			return { success: false, message: "No token found.", user: null };
		}

		const response = await api.patch("/auth/update/avatar", data, {
			headers: { cookie: `jwt=${token}` },
		});

		return {
			success: true,
			message: "Profile updated successfully.",
			user: response.data.user,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data?.errors)
				return {
					user: null,
					errors: error.response.data.errors,
					success: false,
				};

			return {
				success: false,
				message:
					error.response?.data?.message ||
					"An error occurred while updating your avatar.",
				user: null,
			};
		}

		return {
			success: false,
			message: "An error occurred while updating your avatar.",
			user: null,
		};
	}
};
