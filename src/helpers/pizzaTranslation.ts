const sizes: { [key: string]: string } = {
    "SMALL": 'Маленькая',
    "MEDIUM": 'Средняя',
    "LARGE": 'Большая'
};

const doughs: { [key: string]: string } = {
    "THIN": 'Традиционное',
    "THICK": 'Тонкое'
};

const ingredients: { [key: string]: string } = {
    "PINEAPPLE": 'Ананасы',
    "MOZZARELLA": 'Моцарелла',
    "PEPERONI": 'Пепперони',
    "GREEN_PEPPER": 'Сладкий перец',
    "MUSHROOMS": 'Грибы',
    "BASIL": 'Базилик',
    "CHEDDAR": 'Чеддер',
    "PARMESAN": 'Пармезан',
    "FETA": 'Сыр фета',
    "HAM": 'Ветчина',
    "PICKLE": 'Маринованные огурчики',
    "TOMATO": 'Помидоры',
    "BACON": 'Бекон',
    "ONION": 'Лук',
    "CHILE": 'Перец чили',
    "SHRIMPS": 'Креветки',
    "CHICKEN_FILLET": 'Цыпленок',
    "MEATBALLS": 'Митболы'
};

export function getPizzaSizeName(size: string): string {
    return sizes[size];
}

export function getPizzaDoughsName(dough: string): string {
    return doughs[dough];
}

export function getPizzaIngredientsName(ingredient: string): string {
    return ingredients[ingredient];
}