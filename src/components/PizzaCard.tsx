import Button from "../ui/Button";
import styles from "./card.module.scss"

interface CardProps {
    image: string;
    title: string;
    description: string;
    cost: number;
}

const URL: string = "https://shift-backend.onrender.com"

function PizzaCard({ image, title, description, cost }: CardProps) {

    return (
        <div className={styles.cardContainer}>
            <div className={styles.imageContainer}>
                <img src={URL + image} alt={title} className={styles.cardImage}/>
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
                <Button text="Выбрать" onClick={() => console.log('тык')}/>
            </div>
        </div>
    )
}

export default PizzaCard;
