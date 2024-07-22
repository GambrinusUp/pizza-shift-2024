import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import styles from './FormField.module.scss';

interface FormFieldProps {
    name: string;
    label: string;
    placeholder: string;
    validation?: object;
    type?: string;
    readOnly?: boolean;
    mask?: string | string[];
}

function FormField({ name, label, placeholder, validation = {}, type = 'text', readOnly = false, mask }: FormFieldProps) {
    const { register, formState: { errors } } = useFormContext();
    const registerWithMask = useHookFormMask(register);

    return (
        <div className={styles.formGroup}>
            <label>{label}</label>
            <input
                type={type}
                {...(mask ? registerWithMask(name, mask, validation) : register(name, validation))}
                placeholder={placeholder}
                className={errors[name] ? styles.errorInput : ''}
                readOnly={readOnly}
            />
            {errors[name] && <span className={styles.errorText}>{String(errors[name]?.message)}</span>}
        </div>
    );
}

export default FormField;