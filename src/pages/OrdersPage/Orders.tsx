import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Orders.module.scss';

import OrderItem from '../../components/OrderItem/OrderItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getOrders } from '../../store/ActionCreators';

function Orders() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { orders, isLoading } = useAppSelector(state => state.orderStore);

    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/');
        dispatch(getOrders());
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
                </div>)}
        </>
    )
}

export default Orders;