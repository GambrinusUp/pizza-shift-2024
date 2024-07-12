/// <reference types="vite-plugin-svgr/client" />
import { useNavigate } from "react-router-dom";

import styles from "./SuccessModal.module.scss";

import SuccessIcon from "../../assets/success.svg?react";
import { getPizzaDoughsName, getPizzaSizeName } from "../../helpers/pizzaTranslation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { clearCart } from "../../store/CartSlice";

interface ModalParams {
    isOpen: boolean;
    toggle: () => void;
}

function SuccessModal({ isOpen }: ModalParams) {
    const { pizzas, receiverAddress } = useAppSelector(state => state.cartStore);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const totalPrice = pizzas.reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0);

    const pizzaDescriptions = pizzas.map(pizza => {
        const { name, size, dough } = pizza;
        return `${name}, ${getPizzaSizeName(size.name).toLowerCase()}, ${getPizzaDoughsName(dough.name).toLowerCase()} тесто`;
    }).join('; ');

    const addressDescription = `${receiverAddress.street}, д. ${receiverAddress.house}, кв. ${receiverAddress.apartment}`;
    
    const backToMenu = () => {
        dispatch(clearCart());
        navigate('/');
    }

    return (
        <>
            {isOpen && (
                <div className={styles.modalOverlay}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
                        <SuccessIcon />
                        <span className={styles.title}>
                            Оплата прошла успешно!
                        </span>
                        <div className={styles.description}>
                            <div className={styles.twoLine}>
                                <span className={styles.secondaryText}>
                                    Заказ
                                </span>
                                <span className={styles.primaryText}>
                                    {pizzaDescriptions}
                                </span>
                            </div>
                            <div className={styles.twoLine}>
                                <span className={styles.secondaryText}>
                                    Адрес доставки
                                </span>
                                <span className={styles.primaryText}>
                                    {addressDescription}
                                </span>
                            </div>
                            <div className={styles.twoLine}>
                                <span className={styles.secondaryText}>
                                    Сумма заказа
                                </span>
                                <span className={styles.primaryText}>
                                    {totalPrice} р.
                                </span>
                            </div>
                            <span className={styles.info}>
                                Вся информация была продублирована в SMS
                            </span>
                        </div>
                        <span className={styles.link} onClick={backToMenu}>
                            Перейти в главное меню
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}

export default SuccessModal;
