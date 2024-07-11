import { useEffect, useState } from "react";

import styles from "./pizza.module.scss";

import ToppingCard from "./ToppingCard";

import { API_URL } from "../api/pizzaAPI";
import SegmentedControl, { Segment } from "../components/SegmentedControl";
import { ingredientsToString } from "../helpers/ingredientsToString";
import { getPizzaSizeName, getPizzaDoughsName, getPizzaIngredientsName } from "../helpers/pizzaTranslation";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addPizzaFromModalToCart, editPizza } from "../store/CartSlice";
import { setSelectSize, setSelectDough, toggleTopping } from '../store/PizzaSlice';
import { Dough, Size, Topping } from "../types";
import Button from "../ui/Button";

interface ModalParams {
    isOpen: boolean;
    toggle: () => void;
    type: 'add' | 'edit';
}

function PizzaModal({ isOpen, toggle, type }: ModalParams) {
    const dispatch = useAppDispatch();
    const { selectedPizza, selectedSize, selectedDough, selectedToppings, totalPrice } = useAppSelector(state => state.pizzaStore);

    const [initialPizza, setInitialPizza] = useState<string>('');
    const [initialSize, setInitialSize] = useState<Size>({name: '', price: 0});
    const [initialDough, setInitialDough] = useState<Dough>({name: '', price: 0});
    const [initialToppings, setInitialToppings] = useState<Topping[]>([]);

    useEffect(() => {
        if (isOpen && type === 'edit') {
            setInitialPizza(selectedPizza.id);
            setInitialSize(selectedSize);
            setInitialDough(selectedDough);
            setInitialToppings(selectedToppings);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const handleToppingClick = (topping: Topping) => {
        dispatch(toggleTopping(topping));
    };

    const sizeSegments = selectedPizza.sizes.map((size) => ({
        name: size.name, //getPizzaSizeName
        price: size.price,
    }));

    const doughsSegments = selectedPizza.doughs.map((dough) => ({
        name: dough.name, //getPizzaDoughsName
        price: dough.price,
    }));

    const handleSizeChange = (segment: Segment) => {
        dispatch(setSelectSize(segment));
    };

    const handleDoughChange = (segment: Segment) => {
        dispatch(setSelectDough(segment));
    };

    const handleAddPizzaToCart = () => {
        if (selectedPizza && selectedSize && selectedDough) {
            dispatch(addPizzaFromModalToCart({ pizza: selectedPizza, sizeSelected: selectedSize, 
                doughSelected: selectedDough, toppings: selectedToppings, price: totalPrice }));
        }
    };

    const handleEditPizzaInCart = () => {
        dispatch(editPizza({
            id: initialPizza, size: initialSize, dough: initialDough, toppings: initialToppings,
            editSize: selectedSize, editDough: selectedDough, 
            editToppings: selectedToppings, price: totalPrice
        }));
    }

    return (
        <>
            {isOpen && (
                <div className={styles.modalOverlay} onClick={toggle}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
                        <div className={styles.modalContainer}>
                            <div className={styles.modalImage}>
                                <img src={API_URL + selectedPizza?.img} alt={selectedPizza?.name} className={styles.modalImage}/>
                            </div>
                            <div className={styles.modalDescriptionContainer}>
                                <span className={styles.modalPizzaName}>
                                    {selectedPizza.name}
                                </span>
                                <span className={styles.modalPizzaSize}>
                                    {getPizzaSizeName(selectedSize?.name)}, {getPizzaDoughsName(selectedDough?.name).toLowerCase()} тесто
                                </span>
                                <span className={styles.modalPizzaIngredients}>
                                    {ingredientsToString(selectedPizza.ingredients)}
                                </span>
                                {selectedSize && (<SegmentedControl 
                                    segments={sizeSegments}
                                    initialSegment={selectedSize}
                                    onSegmentChange={handleSizeChange}
                                    type="size"
                                />)}
                                {selectedDough && (<SegmentedControl 
                                    segments={doughsSegments}
                                    initialSegment={selectedDough}
                                    onSegmentChange={handleDoughChange}
                                    type="dough"
                                />)}
                                <span className={styles.modalAddToppingsText}>
                                    Добавить по вкусу
                                </span>
                                <div className={styles.modalToppingsContainer}>
                                    {selectedPizza.toppings.map(topping => (
                                        <ToppingCard 
                                            key={topping.name}
                                            image={topping.img}
                                            toppingName={getPizzaIngredientsName(topping.name)}
                                            toppingPrice={topping.cost}
                                            isSelected={selectedToppings.some(t => t.name === topping.name)}
                                            onToppingSelect={() => handleToppingClick(topping)}
                                        />
                                    ))}
                                </div>
                                {type === 'add' ? (
                                    <Button text={"В корзину за " + totalPrice + " ₽"} 
                                    onClick={() => {toggle(); console.log(selectedPizza); handleAddPizzaToCart()}}/>
                                ) : (
                                    <Button text={"Изменить"} 
                                    onClick={() => {toggle(); console.log(selectedPizza); handleEditPizzaInCart()}}/>
                                )}   
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PizzaModal;