import { Link } from 'react-router-dom';

import styles from './OrderItem.module.scss';

import { getPizzaStatusName } from '../helpers/pizzaTranslation';
import { ReceiverAddress } from '../types';

interface OrderItemParams {
    id: string;
    status: number;
    receiverAddress: ReceiverAddress;
}

function OrderItem({ id, status, receiverAddress } : OrderItemParams) {
    const addressDescription = `${receiverAddress.street}, д. ${receiverAddress.house}, кв. ${receiverAddress.apartment}`;

    return(
        <div className={styles.container}>
            <div className={styles.status}>
                {getPizzaStatusName(status)}
            </div>
            <span className={styles.address}>
                {addressDescription}
            </span>
            <span className={styles.structure}>
                Вкусная пицца
            </span>
            <Link to={`/orders/${id}`}><span className={styles.link}>
                Подробнее
            </span></Link>
        </div>
    )
}

export default OrderItem;