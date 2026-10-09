import {
	getUser,
	registerUser,
	signInUser,
	updateProfile,
	updateUserAvatar,
} from "@/features/auth/api";
import { LoginInput, RegisterInput } from "@/schemas/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ProfileFormInput } from "@/schemas/profile";

export const useGetUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: getUser,
	});
};

export const useRegisterUser = () => {
	return useMutation({
		mutationFn: async (data: RegisterInput) => await registerUser(data),
	});
};

export const useSignInUser = () => {
	return useMutation({
		mutationFn: async (data: LoginInput) => await signInUser(data),
	});
};

export const useUpdateProfile = () => {
	return useMutation({
		mutationFn: async (data: ProfileFormInput) => await updateProfile(data),
	});
};

export const useUpdateAvatar = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: FormData) => {
			return await updateUserAvatar(data);
		},
		onSuccess: (data) => {
			// Update the user data in the query cache after a successful avatar update
			if (data.user) queryClient.setQueryData(["user"], data.user);
		},
	});
};
