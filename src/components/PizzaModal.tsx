import styles from "./pizza.module.scss";
import SegmentedControl, { Segment } from "../components/SegmentedControl";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Topping } from "../types";
import Button from "../ui/Button";
import ToppingCard from "./ToppingCard";
import { getPizzaSizeName, getPizzaDoughsName, getPizzaIngredientsName } from "../helpers/pizzaTranslation";
import { setSelectSize, setSelectDough, toggleTopping } from '../store/PizzaSlice';
import { ingredientsToString } from "../helpers/ingredientsToString";
import { API_URL } from "../api/pizzaAPI";

interface ModalType {
    isOpen: boolean;
    toggle: () => void;
}

function PizzaModal(props: ModalType) {
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
        console.log('Selected size segment:', segment);
    };

    const handleDoughChange = (segment: Segment) => {
        dispatch(setSelectDough(segment));
        console.log('Selected dough segment:', segment);
    };

    return (
        <>
            {props.isOpen && (
                <div className={styles.modalOverlay} onClick={props.toggle}>
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
                                            name={getPizzaIngredientsName(topping.name)}
                                            price={topping.cost}
                                            isSelected={selectedToppings.some(t => t.name === topping.name)}
                                            onClick={() => handleToppingClick(topping)}
                                        />
                                    ))}
                                </div>
                                <Button text={"В корзину за " + totalPrice + " ₽"} 
                                    onClick={() => {
                                        console.log(selectedPizza, selectedToppings, 
                                            selectedSize, selectedDough, totalPrice);
                                        props.toggle()}}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PizzaModal;