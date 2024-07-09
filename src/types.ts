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