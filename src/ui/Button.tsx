import styles from "./button.module.scss"

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

function Button({ text, onClick }: ButtonProps) {
    return(
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;
