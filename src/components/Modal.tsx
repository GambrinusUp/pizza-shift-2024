import { ReactNode } from "react";

import styles from "./modal.module.scss";

interface ModalParams {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

function Modal({ children, isOpen, toggle }: ModalParams) {
    return (
        <>
            {isOpen && (
                <div className={styles.modalOverlay} onClick={toggle}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
