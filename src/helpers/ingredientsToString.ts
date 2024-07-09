import { getPizzaIngredientsName } from "./pizzaTranslation";

import { Ingridient } from "../types";

export function ingredientsToString(ingredients: Ingridient[]): string {
    return ingredients.map((ingredient, index) => {
        const ingredientName = getPizzaIngredientsName(ingredient.name).toLowerCase();
        return index === 0 
            ? ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)
            : ingredientName;
    }).join(', ');
}