import { ReactNode } from "react";

import styles from "./modal.module.scss";

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

function Modal({ children, isOpen, toggle }: ModalType) {
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
