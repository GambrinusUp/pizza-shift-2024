import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CardDetails.module.scss';

import SuccessModal from '../components/SuccessModal';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import useModal from '../hooks/useModal';
import { createtOrder, updateDebitCardInfo } from '../store/CartSlice';
import Button from '../ui/Button';

interface Errors {
    number: string;
    expire: string;
    cvv: string;
}

function CardDetails() {
    const { isOpen, toggle } = useModal();
    const navigate = useNavigate();
    const { receiverAddress, person } = useAppSelector(state => state.cartStore);
    const dispatch = useAppDispatch();
    
    const [cardData, setCardData] = useState({
        number: '',
        expire: '',
        cvv: ''
    });

    const [errors, setErrors] = useState<Errors>({
        number: '',
        expire: '',
        cvv: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardData({
          ...cardData,
          [name]: value
        });
        setErrors({
          ...errors,
          [name]: ''
        });
    };

    const validateCardNumber = (number: string) => {
        const cardNumberRegex = /^\d{4}\d{4}$/;
        return cardNumberRegex.test(number);
    };

    const validateExpire = (expire: string) => {
        const expireRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        return expireRegex.test(expire);
    };

    const validateCVV = (cvv: string) => {
        const cvvRegex = /^\d{3}$/;
        return cvvRegex.test(cvv);
    };

    const handlePay = () => {
        const { number, expire, cvv } = cardData;
        const newErrors: Errors = {
            number: '',
            expire: '',
            cvv: ''
        };

        const validations = [
            { field: 'number', value: number, message: 'Поле "Номер" должно быть заполнено.', validate: validateCardNumber, invalidMessage: 'Введите корректный номер карты в формате.' },
            { field: 'expire', value: expire, message: 'Поле "Срок" должно быть заполнено.', validate: validateExpire, invalidMessage: 'Введите корректный срок действия.' },
            { field: 'cvv', value: cvv, message: 'Поле "CVV" должно быть заполнено.', validate: validateCVV, invalidMessage: 'Введите корректный CVV.' },
        ];

        let valid = true;

        validations.forEach(({ field, value, message, validate, invalidMessage }) => {
            if (!value) {
                newErrors[field as keyof Errors] = message;
                valid = false;
            } else if (validate && !validate(value)) {
                newErrors[field as keyof Errors] = invalidMessage;
                valid = false;
            }
        });

        setErrors(newErrors);

        if (valid) {
            console.log('Оплатить', cardData);
            dispatch(updateDebitCardInfo({
                pan: cardData.number,
                expireDate: cardData.expire,
                cvv: cardData.cvv
            }));
            dispatch(createtOrder());
            toggle();
        }
    };

    useEffect(() => {
        const isReceiverAddressEmpty = Object.values(receiverAddress).every(value => value === "");
        const isPersonEmpty = Object.values(person).every(value => value === "");

        if (isReceiverAddressEmpty && isPersonEmpty) {
            navigate('/cart')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container}>
            <span className={styles.title}>
                Введите данные карты для оплаты
            </span>
            <div className={styles.cardForm}>
                <div className={styles.formGroup}>
                    <label>Номер*</label>
                    <input
                        type="text"
                        name="number"
                        placeholder="0000 0000"
                        value={cardData.number}
                        onChange={handleChange}
                        className={errors.number ? styles.errorInput : ''}
                    />
                    {errors.number && <span className={styles.errorText}>{errors.number}</span>}
                </div>
                <div className={styles.expireCvv}>
                    <div className={styles.formGroup}>
                        <label>Срок*</label>
                        <input
                            type="text"
                            name="expire"
                            placeholder="00/00"
                            value={cardData.expire}
                            onChange={handleChange}
                            className={errors.expire ? styles.errorInput : ''}
                        />
                        {errors.expire && <span className={styles.errorText}>{errors.expire}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>CVV*</label>
                        <input
                            type="text"
                            name="cvv"
                            placeholder="000"
                            value={cardData.cvv}
                            onChange={handleChange}
                            className={errors.cvv ? styles.errorInput : ''}
                        />
                        {errors.cvv && <span className={styles.errorText}>{errors.cvv}</span>}
                    </div>
                </div>
            </div>
            <Button text="Оплатить" onClick={handlePay} />
            <SuccessModal isOpen={isOpen} toggle={toggle} />
        </div>
    );
}

export default CardDetails;
