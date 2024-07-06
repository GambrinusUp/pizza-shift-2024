/// <reference types="vite-plugin-svgr/client" />
import PizzaIcon from "../assets/icon.svg?react";
import ProfileIcon from "../assets/profile.svg?react";
import OrdersIcon from "../assets/orders.svg?react";
import CartIcon from "../assets/cart.svg?react";
import ExitIcon from "../assets/exit.svg?react";
import styles from "./navbar.module.scss";

function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <PizzaIcon />
                <div className={styles.iconTextGroup}>
                    <ProfileIcon />
                    Профиль
                </div>
                <div className={styles.iconTextGroup}>
                    <OrdersIcon />
                    Заказы
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.iconTextGroup}>
                    <CartIcon />
                    Корзина
                </div>
                <div className={styles.iconTextGroup}>
                    <ExitIcon />
                    Выйти
                </div>
            </div>
        </div>
    )
}

export default Navbar;
