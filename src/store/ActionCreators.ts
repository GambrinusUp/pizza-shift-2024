import { createAsyncThunk } from "@reduxjs/toolkit";

import { pizzaAPI } from "../api/pizzaAPI";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { Pizza } from "../types";

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