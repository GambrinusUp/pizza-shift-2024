import { ReactNode } from "react";
import styles from "./modal.module.scss";

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

function Modal(props: ModalType) {
    return (
        <>
            {props.isOpen && (
                <div className={styles.modalOverlay} onClick={props.toggle}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
