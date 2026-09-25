import { registerUser, signInUser } from "@/features/auth/api";
import { LoginInput, RegisterInput } from "@/schemas/auth";
import { useMutation } from "@tanstack/react-query";

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
