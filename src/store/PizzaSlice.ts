import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pizza, Topping } from "../types.ts";
import { getPizzasList } from "./ActionCreators.ts";

export interface PizzaState {
    pizzas: Pizza[];
    selectedPizza: Pizza;
    selectedSize: { name: string, price: number };
    selectedDough: { name: string, price: number };
    selectedToppings: Topping[];
    isLoading: boolean;
    error: string;
    totalPrice: number;
}

const initialState: PizzaState = {
    pizzas: [],
    selectedPizza: {
        id: '',
        name: '',
        ingredients: [],
        toppings: [],
        description: '',
        sizes: [],
        doughs: [],
        calories: 0,
        protein: '',
        totalFat: '',
        carbohydrates: '',
        sodium: '',
        allergens: [],
        isVegetarian: false,
        isGlutenFree: false,
        isNew: false,
        isHit: false,
        img: ''
    },
    selectedSize: {
        name: '',
        price: 0
    },
    selectedDough: {
        name: '',
        price: 0
    },
    selectedToppings: [],
    isLoading: false,
    error: '',
    totalPrice: 0
}

export const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        selectPizza(state, action: PayloadAction<Pizza>) {
            console.log(action.payload);
            state.selectedPizza = action.payload;
            state.selectedSize = { name: '', price: 0 };
            state.selectedDough = { name: '', price: 0 };
            state.selectedToppings = [];
            state.totalPrice = 0;
        },
        setSelectSize(state, action: PayloadAction<{ name: string, price: number }>) {
            console.log(action.payload);
            state.selectedSize = action.payload;
            pizzaSlice.caseReducers.calculateTotalPrice(state);
        },
        setSelectDough(state, action: PayloadAction<{ name: string, price: number }>) {
            console.log(action.payload);
            state.selectedDough = action.payload;
            pizzaSlice.caseReducers.calculateTotalPrice(state);
        },
        toggleTopping(state, action: PayloadAction<Topping>) {
            const topping = action.payload;
            const existingTopping = state.selectedToppings.find(t => t.name === topping.name);
            if (existingTopping) {
                state.selectedToppings = state.selectedToppings.filter(t => t.name !== topping.name);
            } else {
                state.selectedToppings.push(topping);
            }
            pizzaSlice.caseReducers.calculateTotalPrice(state);
        },
        clearSelectedSizeAndDough(state) {
            state.selectedDough = { name: '', price: 0 };
            state.selectedSize = { name: '', price: 0 };
            state.selectedToppings = [];
            state.totalPrice = 0;
        },
        calculateTotalPrice(state) {
            console.log(state.selectedSize.price, state.selectedDough.price);
            const toppingsPrice = state.selectedToppings.reduce((acc, topping) => acc + topping.cost, 0);
            state.totalPrice = state.selectedSize.price + state.selectedDough.price + toppingsPrice;
        }
    },
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

export const { selectPizza, setSelectSize, setSelectDough, toggleTopping, clearSelectedSizeAndDough } =
pizzaSlice.actions;

export default pizzaSlice.reducer;