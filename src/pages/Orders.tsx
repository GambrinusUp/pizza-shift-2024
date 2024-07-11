import { useEffect } from 'react';

import styles from './Orders.module.scss';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getOrders } from '../store/ActionCreators';

function Orders() {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(state => state.orderStore);

    useEffect(() => {
        dispatch(getOrders());
    }, [])

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <span>
                    Статус
                </span>
                <span>
                    Адрес доставки
                </span>
                <span>
                    Состав заказа
                </span>
            </div>

        </div>
    )
}

export default Orders;