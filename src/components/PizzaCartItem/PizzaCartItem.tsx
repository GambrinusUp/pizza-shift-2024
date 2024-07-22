/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from 'react';

import styles from './PizzaCartItem.module.scss';

import { API_URL } from '../../api/pizzaAPI';
import CancelIcon from '../../assets/cancel.svg?react';
import { getPizzaDoughsName, getPizzaIngredientsName, getPizzaSizeName } from '../../helpers/pizzaTranslation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useModal from '../../hooks/useModal';
import { removePizzaFromCart, updatePizzaQuantity } from '../../store/CartSlice';
import { selectPizza, setSelectDough, setSelectSize, toggleTopping } from '../../store/PizzaSlice';
import { Dough, Size, Topping } from '../../types';
import QuantitySelector from '../../ui/QuantitySelector/QuantitySelector';
import PizzaModal from '../PizzaModal/PizzaModal';

interface PizzaCartItemParams {
    image: string;
    name: string;
    id: string;
    size: Size;
    dough: Dough;
    initalQuantity: number;
    toppings: Topping[];
    price: number;
}

function PizzaCartItem({ image, name, id, size, dough, initalQuantity, toppings, price }: PizzaCartItemParams) {
    const dispatch = useAppDispatch();
    const { isOpen, toggle } = useModal();
    const {pizzas} = useAppSelector(state => state.pizzaStore);
    const pizzasInCart = useAppSelector(state => state.cartStore.pizzas);
    const [quantity, setQuantity] = useState<number>(initalQuantity);

    const toppingsString = toppings.map(topping => getPizzaIngredientsName(topping.name).toLowerCase()).join(', ');

    const onClickEditing = () => {
        const selectedPizza = pizzas.find(pizza => pizza.id === id);
    
        if (selectedPizza) {
            dispatch(selectPizza(selectedPizza));
            dispatch(setSelectSize(size));
            dispatch(setSelectDough(dough));
            toppings.forEach(topping => dispatch(toggleTopping(topping)));
            toggle();
        } 
    }

    const onClickDelete = () => {
        dispatch(removePizzaFromCart({ id, size: size.name, dough: dough.name, toppings }))
    }

    useEffect(() => {
        const selectedPizza = pizzasInCart.find(pizza => pizza.id === id && pizza.size.name === size.name && pizza.dough.name === dough.name 
            && pizza.toppings.map(topping => topping.name).sort().join(',') === toppings.map(topping => topping.name).sort().join(','));
        if (selectedPizza) {
            setQuantity(selectedPizza.quantity);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pizzasInCart]);

    return(
        <div className={styles.container}>
            <img className={styles.image} 
                src={API_URL + image} alt={name} />
            <span className={styles.name}>
                {name}
            </span>
            <div className={styles.description}>
                <span>
                    {getPizzaSizeName(size.name) + ', ' + getPizzaDoughsName(dough.name).toLowerCase() + ' тесто'}
                </span>
                {toppings.length > 0 && (
                    <span>
                        + {toppingsString}
                    </span>
                )}
            </div>
            <QuantitySelector
                initialQuantity={quantity}
                onQuantityChange={(newQuantity: number) => {
                    setQuantity(newQuantity);
                    dispatch(updatePizzaQuantity({id, size: size.name, dough: dough.name, toppings, quantity: newQuantity}));
                }} 
            />
            <span className={styles.editing} onClick={() => onClickEditing()}>
                Изменить
            </span>
            <span className={styles.price}>
                {price * quantity} р
            </span>
            <CancelIcon className={styles.icon} onClick={onClickDelete}/>
            <PizzaModal isOpen={isOpen} toggle={toggle} type="edit" />
        </div>
    )
}

export default PizzaCartItem;