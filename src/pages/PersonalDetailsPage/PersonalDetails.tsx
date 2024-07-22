import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './PersonalDetails.module.scss';

import FormField from '../../components/FormField/FormField';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUserProfile } from '../../store/ActionCreators';
import { updatePersonInfo, updateReceiverAddress } from '../../store/CartSlice';
import Button from '../../ui/Button/Button';


interface FormData {
    lastName: string;
    firstName: string;
    middleName: string;
    phone: string;
    email: string;
    street: string;
    house: string;
    apartment: string;
    city: string;
    comment: string;
}

function PersonalDetails() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.userStore);
    const { pizzas } = useAppSelector(state => state.cartStore);

    const methods = useForm<FormData>();
    const { setValue, handleSubmit } = methods;

    useEffect(() => {
        setValue('lastName', user.lastname || '');
        setValue('firstName', user.firstname || '');
        setValue('middleName', user.middlename || '');
        setValue('phone', user.phone || '');
        setValue('email', user.email || '');
        setValue('city', user.city || '');
    }, [user, setValue]);

    const handleBack = () => {
        navigate('/cart');
    };

    const onSubmit = async (data: FormData) => {
        dispatch(updatePersonInfo({
            firstname: data.firstName,
            lastname: data.lastName,
            middlename: data.middleName,
            phone: data.phone
        }));
        dispatch(updateReceiverAddress({
            street: data.street,
            house: data.house,
            apartment: data.apartment,
            comment: data.comment
        }));
        console.log(data);
        navigate('/payment');
    };

    useEffect(() => {
        if (pizzas.length === 0) {
            navigate('/cart');
        }
        dispatch(getUserProfile()); 
    }, [dispatch, navigate, pizzas.length])

    return (
        <div className={styles.container}>
            <span className={styles.title}>
                Введите ваши данные
            </span>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
                    <FormField 
                        name="lastName" 
                        label="Фамилия*" 
                        placeholder="Фамилия" 
                        validation={{ required: 'Поле "Фамилия" должно быть заполнено.' }} 
                    />
                    <FormField 
                        name="firstName" 
                        label="Имя*" 
                        placeholder="Имя" 
                        validation={{ required: 'Поле "Имя" должно быть заполнено.' }} 
                    />
                    <FormField 
                        name="middleName" 
                        label="Отчество" 
                        placeholder="Отчество" 
                    />
                    <FormField
                        name="phone"
                        label="Номер телефона*"
                        placeholder="Телефон"
                        mask="+7 (999) 999-99-99"
                        validation={{ 
                            required: 'Поле "Номер телефона" должно быть заполнено.', 
                            pattern: {
                                value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                                message: 'Введите корректный номер телефона'
                            }
                        }}
                        readOnly
                    />
                    <FormField
                        name="email" 
                        label="Email*" 
                        placeholder="Email" 
                        validation={{ 
                            required: 'Поле "Email" должно быть заполнено.', 
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Введите корректный email.'
                            }
                        }}
                    />
                    <FormField 
                        name="street" 
                        label="Улица*" 
                        placeholder="Улица" 
                        validation={{ required: 'Поле "Улица" должно быть заполнено.' }} 
                    />
                    <FormField 
                        name="house" 
                        label="Дом*" 
                        placeholder="Дом" 
                        validation={{ required: 'Поле "Дом" должно быть заполнено.' }} 
                    />
                    <FormField 
                        name="apartment" 
                        label="Квартира*" 
                        placeholder="Квартира" 
                        validation={{ required: 'Поле "Квартира" должно быть заполнено.' }} 
                    />
                    <FormField 
                        name="city" 
                        label="Город*" 
                        placeholder="Город" 
                        validation={{ required: 'Поле "Город" должно быть заполнено.' }} 
                        readOnly 
                    />
                    <FormField 
                        name="comment" 
                        label="Комментарий" 
                        placeholder="Комментарий" 
                    />
                    <div className={styles.buttonGroup}>
                        <Button onClick={handleBack} text="Назад" variant="transparent" />
                        <Button type="submit" text="Продолжить" />
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

export default PersonalDetails;