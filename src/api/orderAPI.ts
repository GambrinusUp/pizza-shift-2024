import axios from "axios";

import { API_URL } from "./pizzaAPI";

import { Order } from "../types";

async function getOrders(token: string): Promise<{ orders: Order[] }> {
    const response = await axios.get<{ orders: Order[] }>(API_URL + "/pizza/orders", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const orderAPI = {
    getOrders : getOrders
}
