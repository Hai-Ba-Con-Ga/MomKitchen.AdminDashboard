import axios from "axios";
const getToken = () => {
	const token = localStorage.getItem("access_token")
		? localStorage.getItem("access_token")
		: "";
	return token ? JSON.parse(token) : "";
};
// const BASE_URL = import.meta.env.VITE_DEV_SERVER_URI;
// const BASE_URL = "https://localhost:7137";

const axiosClient = axios.create({
	// baseURL: BASE_URL+"/"+import.meta.env.VITE_API_VERSION,
	baseURL: "https://momkitchen.wyvernpserver.tech/api/v1",
	// baseURL: "http://localhost:5000/api/v1",
	// withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		// "Access-Control-Allow-Origin": "*",
		Authorization: `Bearer ${getToken()}`,
	},
});

export default axiosClient;
