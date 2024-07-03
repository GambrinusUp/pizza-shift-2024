import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pizza } from "../types.ts";
import { getPizzasList } from "./ActionCreators.ts";

export interface PizzaState {
    pizzas: Pizza[];
    isLoading: boolean;
    error: string;
}

const initialState: PizzaState = {
    pizzas: [],
    isLoading: false,
    error: ''
}

export const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPizzasList.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(getPizzasList.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
                state.isLoading = false;
                state.pizzas = action.payload;
            })
            .addCase(getPizzasList.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Ошибка получения данных';
            });
    },
})

export default pizzaSlice.reducer;