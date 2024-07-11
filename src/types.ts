export interface Ingridient {
    name: string;
    cost: number;
    img: string;
}

export interface Topping {
    name: string;
    cost: number;
    img: string;
}

export interface Size {
    name: string;
    price: number;
}

export interface Dough {
    name: string;
    price: number;
}

export interface Pizza {
    id: string;
    name: string;
    ingredients: Ingridient[];
    toppings: Topping[];
    description: string;
    sizes: Size[];
    doughs: Dough[];
    calories: number;
    protein: string;
    totalFat: string;
    carbohydrates: string;
    sodium: string;
    allergens: string[];
    isVegetarian: boolean;
    isGlutenFree: boolean;
    isNew: boolean;
    isHit: boolean;
    img: string;
}

export interface PizzaArray {
    success: string;
    catalog: Pizza[];
}

export interface ReceiverAddress {
    street: string;
    house: string;
    apartment: string;
    comment: string;
}

export interface Person {
    firstname: string;
    lastname: string;
    middlename: string;
    phone: string;
}

export interface DebitCard {
    pan: string;
    expireDate: string;
    cvv: string;
}

export interface PizzaPayment {
    id: string;
    name: string;
    toppings: Topping[];
    description: string;
    size: Size;
    dough: Dough;
    quantity: number;
    image: string;
    price: number;
}

export interface User {
    _id: string;
    phone: string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    city: string;
}

export type PartialPizzaPayment = Pick<PizzaPayment, 'id' | 'name' | 'toppings' | 'description' | 'size' | 'dough'>;

export interface Order {
    person: Person;
    receiverAddress: ReceiverAddress;
    status: number;
    cancellable: boolean;
}