import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { pizzaAPI } from "../api/pizzaAPI";
import { DebitCard, Dough, PartialPizzaPayment, Person, Pizza, PizzaPayment, ReceiverAddress, Size, Topping } from "../types";

const loadPizzasFromLocalStorage = (): PizzaPayment[] => {
    try {
        const serializedState = localStorage.getItem('pizzas');
        if (serializedState === null) {
            return [];
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return [];
    }
};

const savePizzasToLocalStorage = (pizzas: PizzaPayment[]) => {
    try {
        const serializedState = JSON.stringify(pizzas);
        localStorage.setItem('pizzas', serializedState);
    } catch (err) {
        console.error("Could not save pizzas", err);
    }
};

export interface CartState {
    receiverAddress: ReceiverAddress;
    person: Person;
    debitCard: DebitCard;
    pizzas: PizzaPayment[];
}

const initialState: CartState = {
    receiverAddress: {
        street: "",
        house: "",
        apartment: "",
        comment: ""
    },
    person: {
        firstname: "",
        lastname: "",
        middlename: "",
        phone: ""
    },
    debitCard: {
        pan: "",
        expireDate: "",
        cvv: ""
    },
    pizzas: loadPizzasFromLocalStorage()
}

const createPizzaKey = (pizza: PizzaPayment) => {
    const { id, size, dough, toppings } = pizza;
    const toppingsString = toppings.map(topping => topping.name).sort().join(',');
    return `${id}_${size.name}_${dough.name}_${toppingsString}`;
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaFromModalToCart: (state, action: PayloadAction<{ pizza: Pizza, sizeSelected: Size, 
                doughSelected: Dough, toppings: Topping[], price: number }>) => {
            const { pizza, sizeSelected, doughSelected, toppings, price } = action.payload;
            console.log(action.payload);
            const pizzaPayment: PizzaPayment = {
                id: pizza.id,
                name: pizza.name,
                toppings: toppings,
                description: pizza.description,
                size: sizeSelected,
                dough: doughSelected,
                quantity: 1,
                image: pizza.img,
                price: price
            };
            const key = createPizzaKey(pizzaPayment);
            console.log(key)
            const existingPizza = state.pizzas.find(p => createPizzaKey(p) === key);
            if (existingPizza) {
                console.log('updateQuantity')
                existingPizza.quantity += 1;
            } else {
                console.log('addToState')
                console.log(pizzaPayment)
                state.pizzas.push(pizzaPayment);
            }
            console.log(state.pizzas);
            savePizzasToLocalStorage(state.pizzas);
        },
        updatePizzaQuantity: (state, action: PayloadAction<{ id: string, size: string, dough: string, toppings: Topping[], quantity: number }>) => {
            const { id, size, dough, toppings, quantity } = action.payload;
            const toppingsString = toppings.map(topping => topping.name).sort().join(',');
            const key = `${id}_${size}_${dough}_${toppingsString}`;
            const existingPizza = state.pizzas.find(p => createPizzaKey(p) === key);
            if (existingPizza) {
                existingPizza.quantity = quantity;
            }
            savePizzasToLocalStorage(state.pizzas);
        },
        editPizza: (state, action: PayloadAction<{ id: string, size: Size, dough: Dough, toppings: Topping[],
                editSize: Size, editDough: Dough, editToppings: Topping[], price: number }>) => {
            const { id, size, dough, toppings, editSize, editDough, editToppings, price } = action.payload;
            const toppingsString = toppings.map(topping => topping.name).sort().join(',');
            const key = `${id}_${size.name}_${dough.name}_${toppingsString}`;
            console.log(key);
            const existingPizza = state.pizzas.findIndex(p => createPizzaKey(p) === key);
            console.log(existingPizza);
            if (existingPizza !== -1) {
                state.pizzas[existingPizza] = {
                    ...state.pizzas[existingPizza],
                    size: editSize,
                    dough: editDough,
                    toppings: editToppings,
                    price
                };
            }

            const updatedToppingsString = editToppings.map(topping => topping.name).sort().join(',');
            const updatedKey = `${id}_${editSize.name}_${editDough.name}_${updatedToppingsString}`;
        
            const duplicatePizzaIndex = state.pizzas.findIndex((p, index) => createPizzaKey(p) === updatedKey && index !== existingPizza);
            if (duplicatePizzaIndex !== -1) {
                state.pizzas[existingPizza].quantity += state.pizzas[duplicatePizzaIndex].quantity;
                state.pizzas.splice(duplicatePizzaIndex, 1);
            }
            savePizzasToLocalStorage(state.pizzas);
        },
        removePizzaFromCart: (state, action: PayloadAction<{ id: string, size: string, dough: string, toppings: Topping[] }>) => {
            const { id, size, dough, toppings } = action.payload;
            const toppingsString = toppings.map(topping => topping.name).sort().join(',');
            const key = `${id}_${size}_${dough}_${toppingsString}`;
            state.pizzas = state.pizzas.filter(p => createPizzaKey(p) !== key);
            savePizzasToLocalStorage(state.pizzas);
        },
        updatePersonInfo: (state, action: PayloadAction<Person>) => {
            state.person = action.payload;
        },
        updateReceiverAddress: (state, action: PayloadAction<ReceiverAddress>) => {
            state.receiverAddress = action.payload;
        },
        updateDebitCardInfo: (state, action: PayloadAction<DebitCard>) => {
            state.debitCard = action.payload;
        },
        createtOrder: (state) => {
            const pizzas: PartialPizzaPayment[] = state.pizzas.map(({ id, name, toppings, description, size, dough }) => ({
                id,
                name,
                toppings,
                description,
                size,
                dough
            }));

            pizzaAPI.createOrder(state.receiverAddress, state.person, state.debitCard, pizzas);            
        },
        clearCart: (state) => {
            state.pizzas = [];
            state.person = initialState.person;
            state.receiverAddress = initialState.receiverAddress;
            state.debitCard = initialState.debitCard;
            localStorage.removeItem('pizzas');
        }
    }
})

export const { addPizzaFromModalToCart, updatePizzaQuantity, editPizza, removePizzaFromCart,
    updatePersonInfo, updateReceiverAddress, updateDebitCardInfo, createtOrder, clearCart
 } = cartSlice.actions;

export default cartSlice.reducer;