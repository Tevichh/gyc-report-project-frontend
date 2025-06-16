import { UserInfo } from "../models/userInfo.interface";

export const getUser = async (userId: string): Promise<UserInfo> => {
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


export const createUserService = async (user: UserInfo) => {
    const response = await fetch(`${import.meta.env.VITE_API_ADMIN}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...user, password: `Acceso-${user.nombres.split(" ")[0]}-${user.cedula}`, urlFoto: user.urlFoto || `${user.cedula}.jpg` }),
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }
    const data = await response.json();
    return data;
}

export const updateUserService = async (user: UserInfo) => {
    const response = await fetch(`${import.meta.env.VITE_API_ADMIN}/updateUser/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }
    const data = await response.json();
    return data;
}

export const deleteUserSevice = async (userId: number) => {
    const response = await fetch(`${import.meta.env.VITE_API_ADMIN}/deleteUser/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
    const data = await response.json();
    return data;
}