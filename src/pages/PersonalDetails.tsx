import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './PersonalDetails.module.scss';

import { validatePhone } from '../helpers/validatePhone';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUserProfile } from '../store/ActionCreators';
import { updatePersonInfo, updateReceiverAddress } from '../store/CartSlice';
import Button from '../ui/Button';

interface Errors {
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

    const [formData, setFormData] = useState({
        lastName: user.lastname || '',
        firstName: user.firstname || '',
        middleName: user.middlename || '',
        phone: user.phone || '',
        email: user.email || '',
        street: '',
        house: '',
        apartment: '',
        city: user.city || '',
        comment: ''
    });

    const [errors, setErrors] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        phone: '',
        email: '',
        street: '',
        house: '',
        apartment: '',
        city: '',
        comment: ''
    });

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

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleBack = () => {
        navigate('/cart');
    };

    const handleContinue = () => {
        const { lastName, firstName, phone, email, street, house, apartment, city } = formData;
        const newErrors: Errors = {
            lastName: '',
            firstName: '',
            middleName: '',
            phone: '',
            email: '',
            street: '',
            house: '',
            apartment: '',
            city: '',
            comment: ''
        };

        const validations = [
            { field: 'lastName', value: lastName, message: 'Поле "Фамилия" должно быть заполнено.' },
            { field: 'firstName', value: firstName, message: 'Поле "Имя" должно быть заполнено.' },
            { field: 'phone', value: phone, message: 'Поле "Номер телефона" должно быть заполнено.', validate: validatePhone, invalidMessage: 'Введите корректный номер телефона.' },
            { field: 'email', value: email, message: 'Поле "Email" должно быть заполнено.', validate: validateEmail, invalidMessage: 'Введите корректный email.' },
            { field: 'street', value: street, message: 'Поле "Улица" должно быть заполнено.' },
            { field: 'house', value: house, message: 'Поле "Дом" должно быть заполнено.' },
            { field: 'apartment', value: apartment, message: 'Поле "Квартира" должно быть заполнено.' },
            { field: 'city', value: city, message: 'Поле "Город" должно быть заполнено.' }
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
            console.log('Продолжить', formData);
            dispatch(updatePersonInfo({
                firstname: formData.firstName,
                lastname: formData.lastName,
                middlename: formData.middleName,
                phone: formData.phone
            }));
            dispatch(updateReceiverAddress({
                street: formData.street,
                house: formData.house,
                apartment: formData.apartment,
                comment: formData.comment
            }));
            navigate('/payment');
        }
    };

    useEffect(() => {
        if (pizzas.length === 0) {
            navigate('/cart');
        }
        dispatch(getUserProfile()); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() => {
        setFormData({
            lastName: user.lastname || '',
            firstName: user.firstname || '',
            middleName: user.middlename || '',
            phone: user.phone || '',
            email: user.email || '',
            city: user.city || '',
            street: '',
            house: '',
            apartment: '',
            comment: ''
        });
    }, [user]);

    return (
        <div className={styles.container}>
            <span className={styles.title}>
                Введите ваши данные
            </span>
            <div className={styles.formGroup}>
                <label>Фамилия*</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Фамилия"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? styles.errorInput : ''}
                />
                {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Имя*</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Имя"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? styles.errorInput : ''}
                />
                {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Отчество</label>
                <input
                    type="text"
                    name="middleName"
                    placeholder="Отчество"
                    value={formData.middleName}
                    onChange={handleChange}
                    className={errors.middleName ? styles.errorInput : ''}
                />
                {errors.middleName && <span className={styles.errorText}>{errors.middleName}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Номер телефона*</label>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? styles.errorInput : ''}
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Email*</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.errorInput : ''}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Улица*</label>
                <input
                    type="text"
                    name="street"
                    placeholder="Улица"
                    value={formData.street}
                    onChange={handleChange}
                    className={errors.street ? styles.errorInput : ''}
                />
                {errors.street && <span className={styles.errorText}>{errors.street}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Дом*</label>
                <input
                    type="text"
                    name="house"
                    placeholder="Дом"
                    value={formData.house}
                    onChange={handleChange}
                    className={errors.house ? styles.errorInput : ''}
                />
                {errors.house && <span className={styles.errorText}>{errors.house}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Квартира*</label>
                <input
                    type="text"
                    name="apartment"
                    placeholder="Квартира"
                    value={formData.apartment}
                    onChange={handleChange}
                    className={errors.apartment ? styles.errorInput : ''}
                />
                {errors.apartment && <span className={styles.errorText}>{errors.apartment}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Город*</label>
                <input
                    type="text"
                    name="city"
                    placeholder="Город"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? styles.errorInput : ''}
                    readOnly
                />
                {errors.city && <span className={styles.errorText}>{errors.city}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Комментарий</label>
                <input
                    type="text"
                    name="comment"
                    placeholder="Комментарий"
                    value={formData.comment}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.buttonGroup}>
                <Button onClick={handleBack} text="Назад" type="transparent" />
                <Button onClick={handleContinue} text="Продолжить" />
            </div>
        </div>
    );
}

export default PersonalDetails;
