/// <reference types="vite-plugin-svgr/client" />
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./navbar.module.scss";

import CartIcon from "../../assets/cart.svg?react";
import ExitIcon from "../../assets/exit.svg?react";
import PizzaIcon from "../../assets/icon.svg?react";
import OrdersIcon from "../../assets/orders.svg?react";
import ProfileIcon from "../../assets/profile.svg?react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/UserSlice";

function Navbar() {
    const isLoggedIn = useAppSelector(state => state.userStore);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onLogout = () => {
        dispatch(logout());
        navigate("/authorization");
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className={styles.navbar}>
            <div className={styles.left}>
                <Link to='/'> <PizzaIcon /> </Link>
                {isLoggedIn && (<div className={styles.iconTextGroup}>
                    <ProfileIcon fill="#F4511E"/>
                    <Link className={`${styles.link_text} ${isActive('/profile') && styles.active}`} to='/profile'>
                        Профиль
                    </Link>
                </div>)}
                {isLoggedIn && (<div className={styles.iconTextGroup}>
                    <OrdersIcon />
                    <Link className={`${styles.link_text} ${isActive('/orders') && styles.active}`} to='/orders'>
                        Заказы
                    </Link>
                </div>)}
            </div>
            <div className={styles.right}>
                <div className={styles.iconTextGroup}>
                    <CartIcon />
                    <Link className={`${styles.link_text} ${isActive('/cart') && styles.active}`} to='/cart'>
                        Корзина
                    </Link>
                </div>
                <div className={styles.iconTextGroup}>
                    <ExitIcon />
                    {isLoggedIn ? (
                        <span className={styles.link_text} onClick={onLogout}>
                            Выйти
                        </span>
                    ) : (
                        <Link className={styles.link_text} to='/authorization'>
                            Войти
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;
