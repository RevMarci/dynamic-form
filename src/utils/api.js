import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://test.superhero.hu";

export async function apiRequest(endpoint, method = "GET", data = null) {
    try {
        const response = await axios({
        url: `${BASE_URL}/${endpoint}`,
        method,
        headers: { "Content-Type": "application/json" },
        data,
        });

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}
