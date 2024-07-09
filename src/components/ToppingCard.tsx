/// <reference types="vite-plugin-svgr/client" />
import styles from "./topping.module.scss";

import { API_URL } from "../api/pizzaAPI";
import SelectIcon from "../assets/select.svg?react";

interface ToppingCardProps {
    image: string;
    toppingName: string;
    toppingPrice: number;
    isSelected: boolean;
    onToppingSelect: () => void;
}

function ToppingCard({ image, toppingName, toppingPrice, isSelected, onToppingSelect }: ToppingCardProps) {
    return (
        <div className={`${styles.toppingCardContainer} ${isSelected ? styles.selected : ''}`}
            onClick={onToppingSelect}>
            <img className={styles.toppingCardImage} 
                src={API_URL + image} alt={toppingName} />
            {isSelected && <SelectIcon className={styles.selectedIcon} />}
            <span className={styles.toppingCardName}>
                {toppingName}
            </span>
            <span className={styles.toppingCardPrice}>
                {toppingPrice} ₽
            </span>
        </div>
    )
}

export default ToppingCard;