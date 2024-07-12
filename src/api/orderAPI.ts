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

async function getOrder(token: string, id: string): Promise<{ order: Order }> {
    const response = await axios.get<{ order: Order }>(API_URL + "/pizza/orders/" + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

async function cancelOrder(token: string, orderId: string): Promise<{ success: boolean }> {
    const response = await axios.put<{ success: boolean }>(API_URL + "/pizza/orders/cancel",  
        { orderId },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    return response.data;
}


export const orderAPI = {
    getOrders : getOrders,
    getOrder : getOrder,
    cancelOrder : cancelOrder
}
