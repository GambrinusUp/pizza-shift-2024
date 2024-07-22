import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import styles from './Profile.module.scss';

import FormField from '../../components/FormField/FormField';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUserProfile, updateUserProfile } from '../../store/ActionCreators';
import Button from '../../ui/Button/Button';

interface FormData {
    lastName: string;
    firstName: string;
    middleName: string;
    phone: string;
    email: string;
    city: string;
}

function Profile() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector(state => state.userStore);

    const methods = useForm<FormData>();
    const { setValue, handleSubmit } = methods;

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
        dispatch(getUserProfile());
    }, [dispatch, navigate]);

    useEffect(() => {
        setValue('lastName', user.lastname || '');
        setValue('firstName', user.firstname || '');
        setValue('middleName', user.middlename || '');
        setValue('phone', user.phone || '');
        setValue('email', user.email || '');
        setValue('city', user.city || '');
    }, [user, setValue]);

    const onSubmit = async (data: FormData) => {
        const result = await dispatch(updateUserProfile({
            profile: {
                lastname: data.lastName,
                firstname: data.firstName,
                middlename: data.middleName,
                email: data.email,
                city: data.city
            },
            phone: data.phone
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(getUserProfile());
        }
    };

    return(
        <div className={styles.container}>
            <span className={styles.title}>
                Профиль
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
                        label="Отчество*" 
                        placeholder="Отчество" 
                        validation={{ required: 'Поле "Отчество" должно быть заполнено.' }}
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
                        name="city" 
                        label="Город" 
                        placeholder="Город" 
                        validation={{ required: 'Поле "Адрес" должно быть заполнено.' }}
                    />
                    <Button type="submit" text="Обновить" />
                </form>
            </FormProvider>
        </div>
    );
}

export default Profile;