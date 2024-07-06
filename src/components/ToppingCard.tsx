/// <reference types="vite-plugin-svgr/client" />
import { API_URL } from "../api/pizzaAPI";
import SelectIcon from "../assets/select.svg?react";
import styles from "./topping.module.scss";

interface ToppingCardProps {
    image: string;
    name: string;
    price: number;
    isSelected: boolean;
    onClick: () => void;
}

function ToppingCard({ image, name, price, isSelected, onClick }: ToppingCardProps) {
    return (
        <div className={`${styles.toppingCardContainer} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}>
            <img className={styles.toppingCardImage} 
                src={API_URL + image} alt={name} />
            {isSelected && <SelectIcon className={styles.selectedIcon} />}
            <span className={styles.toppingCardName}>
                {name}
            </span>
            <span className={styles.toppingCardPrice}>
                {price} ₽
            </span>
        </div>
    )
}

export default ToppingCard;