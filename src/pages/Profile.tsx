import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Profile.module.scss';

import { validatePhone } from '../helpers/validatePhone';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUserProfile, updateUserProfile } from '../store/ActionCreators';
import Button from '../ui/Button';

interface Errors {
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

    const [formData, setFormData] = useState({
        lastName: user.lastname || '',
        firstName: user.firstname || '',
        middleName: user.middlename || '',
        phone: user.phone || '',
        email: user.email || '',
        city: user.city || ''
    });

    const [errors, setErrors] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
        phone: '',
        email: '',
        city: ''
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
    
    const handleUpdate = async () => {
        const { lastName, firstName, middleName, phone, email, city } = formData;
        const newErrors : Errors = {
            lastName: '',
            firstName: '',
            middleName: '',
            phone: '',
            email: '',
            city: ''
        };
    
        const validations = [
            { field: 'lastName', value: lastName, message: 'Поле "Фамилия" должно быть заполнено.' },
            { field: 'firstName', value: firstName, message: 'Поле "Имя" должно быть заполнено.' },
            { field: 'middleName', value: middleName, message: 'Поле "Отчество" должно быть заполнено.' },
            { field: 'phone', value: phone, message: 'Поле "Номер телефона" должно быть заполнено.', validate: validatePhone, invalidMessage: 'Введите корректный номер телефона.' },
            { field: 'email', value: email, message: 'Поле "Email" должно быть заполнено.', validate: validateEmail, invalidMessage: 'Введите корректный email.' },
            { field: 'address', value: city, message: 'Поле "Адрес" должно быть заполнено.' },
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
            const result = await dispatch(updateUserProfile({
                profile: {
                    lastname: lastName,
                    firstname: firstName,
                    middlename: middleName,
                    email: email,
                    city: city
                },
                phone
            }));
    
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(getUserProfile());
            }
        }
    };
    

    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/');
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
            city: user.city || ''
        });
    }, [user]);

    return(
        <div className={styles.container}>
            <span className={styles.title}>
                Профиль
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
                <label>Отчество*</label>
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
                    readOnly
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
            <div className={styles.formGroup}>
                <label>Email</label>
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
                <label>Город</label>
                <input
                    type="text"
                    name="address"
                    placeholder="Город"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? styles.errorInput : ''}
                />
                {errors.city && <span className={styles.errorText}>{errors.city}</span>}
            </div>
            <Button onClick={handleUpdate} text="Обновить" />
        </div>
    )
}

export default Profile;