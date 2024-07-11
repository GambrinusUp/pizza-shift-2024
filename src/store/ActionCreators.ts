import { createAsyncThunk } from "@reduxjs/toolkit";

import { orderAPI } from "../api/orderAPI";
import { pizzaAPI } from "../api/pizzaAPI";
import { userAPI } from "../api/userAPI";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { Order, Pizza, User } from "../types";

interface OTPResponse {
    success: boolean;
    retryDelay: number;
}

interface authResponse {
    success: boolean;
    user: User;
    token: string;
}

/*interface UserProfileResponse {
    user: User;
}*/

export const getPizzasList = createAsyncThunk<
        Pizza[],
        void,
        { rejectValue: string }
    >(
        'pizzaSlice/getPizzasList',
        async (_, { rejectWithValue }) => {
            try {
                const response = await pizzaAPI.getCatalog();
                return response.catalog;
            } catch (e) {
                return rejectWithValue(getErrorMessage(e));
            }
        }
)

export const createCode = createAsyncThunk<
        OTPResponse,
        string,
        { rejectValue: string }
    >(
        'userSlice/createCode',
        async (phoneNumber, { rejectWithValue }) => {
            try {
                const response = await userAPI.createCode(phoneNumber);
                console.log(response);
                return response;
            } catch (e) {
                return rejectWithValue(getErrorMessage(e));
            }
        }
)

export const signIn = createAsyncThunk<
        authResponse,
        { phone: string; code: number },
        { rejectValue: string }
    >(
        'userSlice/signIn',
        async ({ phone, code }, { rejectWithValue }) => {
            try {
                const response = await userAPI.signIn(phone, code);
                console.log(response);
                return response;
            } catch (e) {
                return rejectWithValue(getErrorMessage(e));
            }
        }
)

export const getUserProfile = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>(
    'userSlice/getUserProfile',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            return rejectWithValue('Нет доступного токена');
        }
        try {
            const response = await userAPI.getUser(token);
            console.log(response);
            return response.user;
        } catch (e) {
            return rejectWithValue(getErrorMessage(e));
        }
    }
);

export const updateUserProfile = createAsyncThunk<
    { success: boolean},
    { profile: Partial<User>, phone: string },
    { rejectValue: string }
>(
    'userSlice/updateUserProfile',
    async ({ profile, phone }, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            return rejectWithValue('Нет доступного токена');
        }
        try {
            const response = await userAPI.updateUserProfile(token, profile, phone);
            console.log(response);
            return response;
        } catch (e) {
            return rejectWithValue(getErrorMessage(e));
        }
    }
);

export const getOrders = createAsyncThunk<
    Order[],
    void,
    { rejectValue: string }
>(
    'userSlice/getOrders',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            return rejectWithValue('Нет доступного токена');
        }
        try {
            const response = await orderAPI.getOrders(token);
            console.log(response);
            return response.orders;
        } catch (e) {
            return rejectWithValue(getErrorMessage(e));
        }
    }
);