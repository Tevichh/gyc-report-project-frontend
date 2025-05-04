import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../models/auth.interdace";

export function isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode<TokenPayload>(token);
        if (Date.now() >= decoded.exp * 1000) {
            localStorage.removeItem("token");
            return false;
        }
        return true;
    } catch {
        return false;
    }
}

export function logout(): void {
    localStorage.removeItem("token");
    window.location.href = "/login";
}

export function getToken(): string | null {
    return localStorage.getItem("token");
}
