import styles from "./card.module.scss";

import { API_URL } from "../api/pizzaAPI";
import Button from "../ui/Button";

interface CardProps {
    image: string;  
    title: string;
    description: string;
    cost: number;
    addPizzaToCart: () => void;
}

function PizzaCard({ image, title, description, cost, addPizzaToCart }: CardProps) {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.imageContainer}>
                <img src={API_URL + image} alt={title} className={styles.cardImage}/>
            </div>
            <div className={styles.cardDescriptionContainer}>
                <span className={styles.cardTitle}>
                    {title}
                </span>
                <span className={styles.cardDescription}>
                    {description}
                </span>
            </div>
            <div className={styles.cardDescriptionContainer}>
                <span className={styles.cardPrice}>
                    от {cost} ₽
                </span>
                <Button text="Выбрать" onClick={addPizzaToCart}/>
            </div>
        </div>
    )
}

export default PizzaCard;
