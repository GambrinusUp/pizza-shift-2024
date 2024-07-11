import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { createCode, getUserProfile, signIn, updateUserProfile } from "./ActionCreators";

import { User } from "../types";

export interface UserState {
    user: User;
    token: string;
    code: string;
    error: string;
    retryDelay: number;
}

const initialState: UserState = {
    user: {
        _id: '',
        phone: '',
        firstname: '',
        lastname: '',
        middlename: '',
        email: '',
        city: ''
    },
    token: '',
    code: '',
    error: '',
    retryDelay: -1
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearRetry(state) {
            state.retryDelay = -1;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createCode.pending, (state) => {
            state.error = '';
            state.retryDelay = -1;
        })
        .addCase(createCode.fulfilled, (state, action) => {
            state.retryDelay = action.payload.retryDelay;
        })
        .addCase(createCode.rejected, (state, action) => {
            state.error = action.payload as string;
            state.retryDelay = -1;
        })
        .addCase(signIn.pending, (state) => {
            state.error = '';
        })
        .addCase(signIn.fulfilled, (state, action: PayloadAction<{ success: boolean, user: Partial<User>, token: string }>) => {
            state.user = { ...state.user, ...action.payload.user };
            state.token = action.payload.token;
            state.retryDelay = -1;
            console.log(state.user);
            localStorage.setItem('token', action.payload.token);
        })
        .addCase(signIn.rejected, (state, action) => {
            state.error = action.payload as string;
            state.error = 'Неправильный отп код';
        })
        .addCase(getUserProfile.pending, (state) => {
            state.error = '';
        })
        .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<Partial<User>>) => {
            state.user = { ...state.user, ...action.payload };
            console.log(state.user);
        })
        .addCase(getUserProfile.rejected, (state, action) => {
            state.error = action.payload as string;
        })
        .addCase(updateUserProfile.pending, (state) => {
            state.error = '';
        })
        .addCase(updateUserProfile.fulfilled, (state) => {
            state.error = '';
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    }
})

export const { clearRetry } = UserSlice.actions;

export default UserSlice.reducer;