export { cn } from "cn";

import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

export default api;
