import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { cancelOrder, getOrderById, getOrders } from "./ActionCreators";

import { Order } from "../types";

export interface OrderState {
    orders: Order[];
    order: Order;
    isLoading: boolean;
    error: string;
}

const initialState: OrderState = {
    orders: [],
    order: {
        _id: "",
        person: {
            firstname: '',
            lastname: '',
            middlename: '',
            phone: ''
        },
        receiverAddress: {
            street: '',
            house: '',
            apartment: '',
            comment: ''
        },
        status: -1,
        cancellable: false,
        created: '',
        updated: '',
    },
    isLoading: false,
    error: '',
}

export const OrderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        cancelOrder(state, action: PayloadAction<string>) {
            const orderId = action.payload;
            const orderIndex = state.orders.findIndex(order => order._id === orderId);
            if (orderIndex !== -1) {
                state.orders[orderIndex].status = -1;
                state.orders[orderIndex].cancellable = false;
                if (state.order._id === orderId) {
                    state.order.status = -1;
                    state.order.cancellable = false;
                }
            }
        }
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
            })
            .addCase(getOrderById.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка получения данных';
            })
            .addCase(cancelOrder.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.success) {
                    const orderId = action.meta.arg.orderId;
                    const orderIndex = state.orders.findIndex(order => order._id === orderId);
                    if (orderIndex !== -1) {
                        state.orders[orderIndex].status = 4;
                        state.orders[orderIndex].cancellable = false;
                        if (state.order._id === orderId) {
                            state.order.status = 4;
                            state.order.cancellable = false;
                        }
                    }
                } else {
                    state.error = 'Ошибка при отмене заказа';
                }
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка при отмене заказа';
            });
    },
})

export default OrderSlice.reducer;