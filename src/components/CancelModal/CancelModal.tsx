/// <reference types="vite-plugin-svgr/client" />

import styles from "./CancelModal.module.scss";

import QuestionIcon from "../../assets/question.svg?react";
import { useAppDispatch } from "../../hooks/redux";
import { cancelOrder } from "../../store/ActionCreators";
import Button from "../../ui/Button/Button";

interface ModalParams {
    isOpen: boolean;
    toggle: () => void;
    id?: string;
}

function CancelModal({ isOpen, toggle, id }: ModalParams) {
    const dispatch = useAppDispatch();

    const cancel = () => {
        if(id) {
            dispatch(cancelOrder({ orderId: id }));
            toggle();
        }
    }

    return (
        <>
            {isOpen && (
                <div className={styles.modalOverlay}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modalBox}>
                        <QuestionIcon />
                        <span className={styles.title}>
                            Отменить заказ?
                        </span>
                        <Button text="Отменить" type="transparent" onClick={cancel}/>
                        <Button text="Не отменять" onClick={toggle}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default CancelModal;
