import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getOrders } from "./ActionCreators";

import { Order } from "../types";

export interface OrderState {
    orders: Order[];
    isLoading: boolean;
    error: string;
}

const initialState: OrderState = {
    orders: [],
    isLoading: false,
    error: '',
}

export const OrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка получения данных';
            });
    },
})

export default OrderSlice.reducer;