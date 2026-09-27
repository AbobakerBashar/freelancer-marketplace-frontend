import { cookies } from "next/headers";

export const getAuthToken = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get("jwt")?.value;
	return token || null;
};
