/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./navbar.module.scss";

import CartIcon from "../../assets/cart.svg?react";
import ExitIcon from "../../assets/exit.svg?react";
import PizzaIcon from "../../assets/icon.svg?react";
import OrdersIcon from "../../assets/orders.svg?react";
import ProfileIcon from "../../assets/profile.svg?react";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {    
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/authorization");
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link to='/'> <PizzaIcon /> </Link>
                {isLoggedIn && (<div className={styles.iconTextGroup}>
                    <ProfileIcon />
                    <Link className={styles.link_text} to='/profile'>Профиль</Link>
                </div>)}
                {isLoggedIn && (<div className={styles.iconTextGroup}>
                    <OrdersIcon />
                    <Link className={styles.link_text} to='/orders'>Заказы</Link>
                </div>)}
            </div>
            <div className={styles.right}>
                <div className={styles.iconTextGroup}>
                    <CartIcon />
                    <Link className={styles.link_text} to='/cart'>Корзина</Link>
                </div>
                <div className={styles.iconTextGroup}>
                    <ExitIcon />
                    {isLoggedIn ? (
                        <span className={styles.link_text} onClick={handleLogout}>Выйти</span>
                    ) : (
                        <Link className={styles.link_text} to='/authorization'>Войти</Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;
