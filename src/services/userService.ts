import { UserInfo } from "../models/userInfo.interface";

export const getUser = async (userId: string) : Promise<UserInfo> => {
    const response = await fetch(`${import.meta.env.VITE_API_ADMIN}/getUserById/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data;
}

export const getAllUsers = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_ADMIN}/getAllUsers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users data");
    }
    const data = await response.json();
    return data;
}