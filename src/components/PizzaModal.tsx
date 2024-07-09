import styles from "./pizza.module.scss";

import ToppingCard from "./ToppingCard";

import { API_URL } from "../api/pizzaAPI";
import SegmentedControl, { Segment } from "../components/SegmentedControl";
import { ingredientsToString } from "../helpers/ingredientsToString";
import { getPizzaSizeName, getPizzaDoughsName, getPizzaIngredientsName } from "../helpers/pizzaTranslation";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setSelectSize, setSelectDough, toggleTopping } from '../store/PizzaSlice';
import { Topping } from "../types";
import Button from "../ui/Button";

interface ModalType {
    isOpen: boolean;
    toggle: () => void;
}

function PizzaModal({ isOpen, toggle }: ModalType) {
    const dispatch = useAppDispatch();
    const { selectedPizza, selectedSize, selectedDough, selectedToppings, totalPrice } = useAppSelector(state => state.pizzaStore);

    const handleToppingClick = (topping: Topping) => {
        dispatch(toggleTopping(topping));
    };

    const sizeSegments = selectedPizza.sizes.map((size) => ({
        name: getPizzaSizeName(size.name),
        price: size.price,
    }));

    const doughsSegments = selectedPizza.doughs.map((dough) => ({
        name: getPizzaDoughsName(dough.name),
        price: dough.price,
    }));

    const handleSizeChange = (segment: Segment) => {
        dispatch(setSelectSize(segment));
    };

    const handleDoughChange = (segment: Segment) => {
        dispatch(setSelectDough(segment));
    };

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
                                    {selectedSize?.name}, {selectedDough?.name.toLowerCase()} тесто
                                </span>
                                <span className={styles.modalPizzaIngredients}>
                                    {ingredientsToString(selectedPizza.ingredients)}
                                </span>
                                <SegmentedControl 
                                    segments={sizeSegments}
                                    onSegmentChange={handleSizeChange}
                                />
                                <SegmentedControl 
                                    segments={doughsSegments}
                                    onSegmentChange={handleDoughChange}
                                />
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
                                <Button text={"В корзину за " + totalPrice + " ₽"} 
                                    onClick={() => {toggle()}}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PizzaModal;