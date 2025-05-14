import { LoginResponse } from "../models/auth.interdace";

const API_URL = import.meta.env.VITE_API_AUTH || "http://localhost:3000";

export async function login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data: LoginResponse = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
    return data;
}
