import axios from "axios";
import { PizzaArray } from "../types";

const API_URL = 'https://shift-backend.onrender.com/pizza/';

async function getCatalog(): Promise<PizzaArray> { //: Promise<PizzaArray>
    try {
        const response = await axios.get<PizzaArray>(API_URL + "catalog");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw(error);
    }
}

export const pizzaAPI = {
    getCatalog : getCatalog
}
