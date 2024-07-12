import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Orders.module.scss';

import OrderItem from '../components/OrderItem';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getOrders } from '../store/ActionCreators';

function Orders() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { orders } = useAppSelector(state => state.orderStore);

    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/');
        dispatch(getOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {orders.map((order, index) => (
                <OrderItem id={order._id} status={order.status} receiverAddress={order.receiverAddress} key={index} />
            ))}
        </div>
    )
}

export default Orders;