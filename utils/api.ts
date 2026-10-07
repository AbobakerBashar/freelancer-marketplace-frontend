import axios, { AxiosResponse } from "axios";

const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
	withCredentials: true,
});

export default api;

export const asyncHnadler = async <T extends object>(
	fun: () => Promise<AxiosResponse>,
): Promise<T> => {
	try {
		const res = await fun();
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("Axios Error Response:", error.response?.data);
			if (error.response?.data?.errors)
				return {
					success: false,
					errors: error.response.data.errors,
					statusCode: error.response.status,
				} as T;
			else
				return {
					success: false,
					statusCode: error.response?.status || 500,
					message:
						error.response?.data?.message ||
						"Something went worong with sending message!",
				} as T;
		} else
			return {
				success: false,
				statusCode: 500,
				message: "Something went worong with the API request!",
			} as T;
	}
};
