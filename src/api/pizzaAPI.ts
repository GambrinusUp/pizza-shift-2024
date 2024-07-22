import axios from "axios";

import { DebitCard, PartialPizzaPayment, Person, PizzaArray, ReceiverAddress } from "../types";

export const API_URL = 'https://shift-backend.onrender.com';

async function getCatalog(): Promise<PizzaArray> {
    const response = await axios.get<PizzaArray>(API_URL + "/pizza/catalog");
    return response.data;
}

async function createOrder(receiverAddress: ReceiverAddress, person: Person, debitCard: DebitCard, pizzas: PartialPizzaPayment[]): Promise<{ success: boolean }> {
    const response = await axios.post<{ success: boolean }>(API_URL + "/pizza/payment", { receiverAddress, person, debitCard, pizzas });
    return { success: response.data.success };
}

export const pizzaAPI = {
    getCatalog : getCatalog,
    createOrder : createOrder
}
