import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Authorization.module.scss";

import { validatePhone } from "../../helpers/validatePhone";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { createCode, signIn } from "../../store/ActionCreators";
import Button from "../../ui/Button/Button";

function Authorization() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { retryDelay, error } = useAppSelector(state => state.userStore);
    
    const [formData, setFormData] = useState({
        phone: '',
        code: ''
    });

    const [errors, setErrors] = useState({
        phone: '',
        code: ''
    });

    const [showCodeInput, setShowCodeInput] = useState(false);
    const [countdown, setCountdown] = useState(retryDelay / 1000);

    useEffect(() => {
        if (retryDelay > 0) {
            setShowCodeInput(true);
            setCountdown(retryDelay / 1000);
            const interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [retryDelay]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        setErrors({
          ...errors,
          [name]: ''
        });
    };

    const handleContinue = () => {
        const { phone } = formData;
        let valid = true;
        const newErrors = { phone: '', code: '' };

        if (!phone) {
            newErrors.phone = 'Поле "Номер телефона" должно быть заполнено.';
            valid = false;
        } else if (!validatePhone(phone)) {
            newErrors.phone = 'Введите корректный номер телефона.';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            dispatch(createCode(phone));
        }
    };

    const handleLogin = async () => {
        const { phone, code } = formData;
        const result = await dispatch(signIn({ phone: phone, code: Number(code) }));
    
        // Check if the action is fulfilled
        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/');
        }
    };
    

    useEffect(() => {
        if (error) {
            setErrors({
                ...errors,
                code: error
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);
    
    return(
        <div className={styles.container}>
            <span className={styles.title}>
                Авторизация
            </span>
            <span className={styles.info}>
                Введите номер телефона для входа в личный кабинет
            </span>
            <div className={styles.formGroup}>
                <input
                    type="text"
                    name="phone"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? styles.errorInput : ''}
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
            {showCodeInput && (<div className={styles.formGroup}>
                <input
                    type="text"
                    name="code"
                    placeholder="Проверочный код"
                    value={formData.code}
                    onChange={handleChange}
                    className={errors.code ? styles.errorInput : ''}
                />
                {errors.code && <span className={styles.errorText}>{errors.code}</span>}
            </div>)}
            <Button onClick={showCodeInput ? handleLogin : handleContinue} text={showCodeInput ? "Войти" : "Продолжить"} />
            {showCodeInput && (
                <div className={styles.retryContainer}>
                    {countdown ? (
                        <span>Повторная отправка кода через {countdown} секунд</span>
                    ) : (
                        <span className={styles.retryLink} onClick={() => dispatch(createCode(formData.phone))}>Отправить код снова</span>
                    )}
                </div>
            )}
        </div>
    )
}

export default Authorization;