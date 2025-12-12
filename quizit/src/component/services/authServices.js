import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

export const loginHandler = async (username, password, emailId) => {
    try {
        const {
            data: { token },
            status,
        } = await axios.post(API_ENDPOINTS.login, {
            username: username,
            password: password,
            emailId: emailId
        })
        if (status === 200) {
            localStorage.setItem("token", token)
            return token
        }
    } catch (err) {
        console.error("Login failed:", err.response?.data || err.message)
        throw err;
    }
}