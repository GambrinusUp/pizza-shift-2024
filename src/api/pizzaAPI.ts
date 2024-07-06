import axios from "axios";
import { PizzaArray } from "../types";

export const API_URL = 'https://shift-backend.onrender.com';

async function getCatalog(): Promise<PizzaArray> { //: Promise<PizzaArray>
    const response = await axios.get<PizzaArray>(API_URL + "/pizza/catalog");
    console.log(response.data);
    return response.data;
}

export const pizzaAPI = {
    getCatalog : getCatalog
}
