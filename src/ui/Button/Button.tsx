import styles from "./button.module.scss"

interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'default' | 'transparent';
}

function Button({ text, onClick, type = 'button', variant = 'default' }: ButtonProps) {
    return(
        <button 
            type={type} 
            className={variant === 'transparent' ? styles.transparentButton : styles.button} 
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button;
