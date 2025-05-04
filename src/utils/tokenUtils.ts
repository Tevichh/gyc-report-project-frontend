import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../models/auth.interdace";

export function decodeToken(token: string): TokenPayload | null {
    try {
        return jwtDecode<TokenPayload>(token);
    } catch {
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    const payload = decodeToken(token);
    if (!payload) return true;
    return Date.now() >= payload.exp * 1000;
}
