import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './OrderInfo.module.scss';

import CancelModal from '../../components/CancelModal/CancelModal';
import { formatDateTime } from '../../helpers/formatDateTime';
import { getPizzaStatusName } from '../../helpers/pizzaTranslation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useModal from '../../hooks/useModal';
import {  getOrderById } from '../../store/ActionCreators';
import Button from '../../ui/Button/Button';

function OrderInfo() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { order, isLoading } = useAppSelector(state => state.orderStore);
    const isLoggedIn = useAppSelector(state => state.userStore);
    const { id } = useParams();
    const { isOpen, toggle } = useModal();

    useEffect(() => {
        if (!isLoggedIn)
            navigate('/');
        if(id)
            dispatch(getOrderById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {isLoading ? (
                <div className={styles.svg_container}>
                <svg className={styles.loader} width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className={styles.path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
                </div>
            ) : (
        <div className={styles.container}>
            <span className={styles.title}>
                История
            </span>
            <div className={styles.card}>
                <div className={styles.twoLine}>
                    <span className={styles.secondary}>
                        Статус
                    </span>
                    <span className={styles.primary}>
                        {getPizzaStatusName(order.status)}
                    </span>
                </div>
                <div className={styles.twoLine}>
                    <span className={styles.secondary}>
                        Адрес доставки
                    </span>
                    <span className={styles.primary}>
                        {`${order.receiverAddress.street}, д. ${order.receiverAddress.house}, кв. ${order.receiverAddress.apartment}`}
                    </span>
                </div>
                <div className={styles.twoLine}>
                    <span className={styles.secondary}>
                        Заказ создан
                    </span>
                    <span className={styles.primary}>
                        {order.created && formatDateTime(order.created)}
                    </span>
                </div>
                <div className={styles.twoLine}>
                    <span className={styles.secondary}>
                        Заказ обновлён
                    </span>
                    <span className={styles.primary}>
                        {order.updated && formatDateTime(order.updated)}
                    </span>
                </div>
                {order.cancellable && (<Button text="Отменить заказ" onClick={toggle} />)}
                <CancelModal isOpen={isOpen} toggle={toggle} id={id}/>
            </div>
        </div>)}
        </>
    )
}

export default OrderInfo;