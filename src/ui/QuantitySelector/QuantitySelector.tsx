import { useEffect, useState } from 'react';

import styles from './QuantitySelector.module.scss';

interface QuantitySelectorValue {
    initialQuantity: number;
    onQuantityChange: (quantity: number) => void;
}

function QuantitySelector({ initialQuantity, onQuantityChange }: QuantitySelectorValue) {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity);
        }
    };

    return(
        <div className={styles.quantitySelector}>
            <button className={styles.button} onClick={handleDecrement}>-</button>
            <span className={styles.quantity}>{quantity}</span>
            <button className={styles.button} onClick={handleIncrement}>+</button>
        </div>
    )
}

export default QuantitySelector;