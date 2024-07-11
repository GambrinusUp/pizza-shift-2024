import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Cart.module.scss";

import PizzaCartItem from "../components/PizzaCartItem";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getPizzasList } from "../store/ActionCreators";
import Button from "../ui/Button";

function Cart() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pizzas } = useAppSelector(state => state.cartStore);

    const totalPrice = pizzas.reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0);

    const order = () => {
        if(localStorage.getItem('token'))
            navigate('/details');
        else
            navigate('/authorization');
    }

    useEffect(() => {
        dispatch(getPizzasList());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return(
        <div className={styles.container}>
            {pizzas.map((pizza, index) => (
                <PizzaCartItem
                    key={index}
                    image={pizza.image}
                    name={pizza.name}
                    id={pizza.id}
                    initalQuantity={pizza.quantity}
                    toppings={pizza.toppings}
                    size={pizza.size}
                    dough={pizza.dough}
                    price={pizza.price}
                />
            ))}
            <div className={styles.total}>
                <span className={styles.total_text}>
                    {totalPrice > 0 ? (`Стоимость заказа: ${totalPrice} р.`) : ("В корзине пусто")}
                </span>
                {totalPrice > 0 && (<Button text="Оформить заказ" onClick={order}/>)}
            </div>
        </div>
    )
}

export default Cart;
