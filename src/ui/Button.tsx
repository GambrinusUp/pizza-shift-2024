import styles from "./button.module.scss"

interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: 'default' | 'transparent';
}

function Button({ text, onClick, type = 'default' }: ButtonProps) {
    return(
        <button className={type === 'transparent' ? styles.transparentButton : styles.button} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;
