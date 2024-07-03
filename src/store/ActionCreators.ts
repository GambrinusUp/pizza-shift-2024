import { createAsyncThunk } from "@reduxjs/toolkit";
import { pizzaAPI } from "../api/pizzaAPI";
import { getErrorMessage } from "../helpers/getErrorMessage";
import { Pizza } from "../types";
//import { pizzaSlice } from "./PizzaSlice";
//import { AppDispatch } from "./store";

/*export const getPizzasList = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(pizzaSlice.actions.pizzaListFetching());
        const response = await pizzaAPI.getCatalog();
        dispatch(pizzaSlice.actions.pizzaListFetchingSuccess(response.catalog));
    } catch (e) {
        dispatch(pizzaSlice.actions.pizzaListFetchingError(getErrorMessage(e)));
    }
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