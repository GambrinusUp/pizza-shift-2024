import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './CardDetails.module.scss';

import FormField from '../../components/FormField/FormField';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useModal from '../../hooks/useModal';
import { createtOrder, updateDebitCardInfo } from '../../store/CartSlice';
import Button from '../../ui/Button/Button';

interface CardData {
    number: string;
    expire: string;
    cvv: string;
}

function CardDetails() {
    const { isOpen, toggle } = useModal();
    const navigate = useNavigate();
    const { receiverAddress, person } = useAppSelector(state => state.cartStore);
    const dispatch = useAppDispatch();
    
    const methods = useForm<CardData>();
    const { handleSubmit } = methods;

    const onSubmit = (data: CardData) => {
        console.log('Оплатить', data);
        dispatch(updateDebitCardInfo({
            pan: data.number,
            expireDate: data.expire,
            cvv: data.cvv
        }));
        dispatch(createtOrder());
        toggle();
    };

    useEffect(() => {
        const isReceiverAddressEmpty = Object.values(receiverAddress).every(value => value === "");
        const isPersonEmpty = Object.values(person).every(value => value === "");

        if (isReceiverAddressEmpty && isPersonEmpty) {
            navigate('/cart')
        }
    }, [receiverAddress, person, navigate]);

    return (
        <div className={styles.container}>
            <span className={styles.title}>
                Введите данные карты для оплаты
            </span>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.cardForm}>
                    <FormField 
                        name="number" 
                        label="Номер*" 
                        placeholder="0000 0000" 
                        mask="9999 9999"
                        validation={{
                            required: 'Поле "Номер" должно быть заполнено.',
                            pattern: {
                                value: /^\d{4} \d{4}$/,
                                message: 'Введите корректный номер карты (8 цифр).'
                            }
                        }}
                    />
                    <div className={styles.expireCvv}>
                        <FormField 
                            name="expire" 
                            label="Срок*" 
                            placeholder="MM/YY" 
                            mask="99/99"
                            validation={{
                                required: 'Поле "Срок" должно быть заполнено.',
                                pattern: {
                                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                    message: 'Введите корректный срок действия (MM/YY).'
                                }
                            }}
                        />
                        <FormField
                            name="cvv" 
                            label="CVV*" 
                            placeholder="000" 
                            mask="999"
                            validation={{
                                required: 'Поле "CVV" должно быть заполнено.',
                                pattern: {
                                    value: /^\d{3}$/,
                                    message: 'Введите корректный CVV (3 цифры).'
                                }
                            }}
                        />
                    </div>
                    <Button text="Оплатить" type="submit" />
                </form>
            </FormProvider>
            <SuccessModal isOpen={isOpen} toggle={toggle} />
        </div>
    );
}

export default CardDetails;
