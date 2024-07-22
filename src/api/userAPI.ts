import axios from "axios";

import { API_URL } from "./pizzaAPI";

import { User } from "../types";

async function createCode(phone: string): Promise<{ success: boolean, retryDelay: number }> {
    const response = await axios.post<{ success: boolean, retryDelay: number }>(API_URL + "/auth/otp", { phone });
    return response.data;
}

async function signIn(phone: string, code: number): Promise<{ success: boolean, user: User, token: string }> {
    const response = await axios.post<{ success: boolean, user: User, token: string }>(API_URL + "/users/signin", { phone, code });
    return response.data;
}

async function getUser(token: string): Promise<{ success: boolean, user: User }> {
    const response = await axios.get<{ success: boolean, user: User }>(API_URL + "/users/session", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

async function updateUserProfile(token: string, profile: Partial<User>, phone: string): Promise<{ success: boolean }> {
    const response = await axios.patch<{ success: boolean }>(API_URL + "/users/profile", 
    { profile, phone },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const userAPI = {
    createCode : createCode,
    signIn : signIn,
    getUser : getUser,
    updateUserProfile : updateUserProfile
}
