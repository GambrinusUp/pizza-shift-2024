import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './Authorization.module.scss';

import FormField from '../../components/FormField/FormField';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createCode, signIn } from '../../store/ActionCreators';
import Button from '../../ui/Button/Button';

interface FormData {
    phone: string;
    code: string;
}

function Authorization() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { retryDelay, error } = useAppSelector(state => state.userStore);

    const methods = useForm<FormData>();
    const { handleSubmit, setError, clearErrors, watch } = methods;
    const phoneValue = watch("phone");

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

    const handleContinue = (data: FormData) => {
        const { phone } = data;
        console.log(phone);
        clearErrors("phone");
        dispatch(createCode(phone));
    };

    const handleLogin = async (data: FormData) => {
        const result = await dispatch(signIn({ phone: data.phone, code: Number(data.code) }));

        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/');
        }
    };

    useEffect(() => {
        if (error) {
            setError("code", { type: "manual", message: error });
        }
    }, [error, setError]);

    return (
        <div className={styles.container}>
            <span className={styles.title}>
                Авторизация
            </span>
            <span className={styles.info}>
                Введите номер телефона для входа в личный кабинет
            </span>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(showCodeInput ? handleLogin : handleContinue)} className={styles.form_container}>
                    <FormField
                        name="phone"
                        label="Телефон"
                        placeholder="+7 (999) 999-99-99"
                        mask="+7 (999) 999-99-99"
                        validation={{
                            required: 'Поле "Номер телефона" должно быть заполнено.',
                            pattern: {
                                value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                                message: 'Введите корректный номер телефона.'
                            }
                        }}
                    />
                    {showCodeInput && (
                        <FormField
                            name="code"
                            label="Проверочный код"
                            placeholder="Проверочный код"
                            validation={{
                                required: 'Поле "Проверочный код" должно быть заполнено.'
                            }}
                        />
                    )}
                    <Button type="submit" text={showCodeInput ? "Войти" : "Продолжить"} />
                    {showCodeInput && (
                        <div className={styles.retryContainer}>
                            {countdown ? (
                                <span>Повторная отправка кода через {countdown} секунд</span>
                            ) : (
                                <span className={styles.retryLink} onClick={() => dispatch(createCode(phoneValue))}>Отправить код снова</span>
                            )}
                        </div>
                    )}
                </form>
            </FormProvider>
        </div>
    );
}

export default Authorization;
