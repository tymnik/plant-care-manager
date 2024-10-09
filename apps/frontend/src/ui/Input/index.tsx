import { InputHTMLAttributes, ReactNode, useState } from 'react';
import clsx from 'clsx';

import style from './index.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelClassName?: string;
    title?: string;
    icon?: ReactNode;
    error?: string;
}

const Input = ({
    title,
    icon,
    error,
    labelClassName = '',
    ...rest
}: InputProps) => {
    const [inputValue, setInputValue] = useState('');
    const errorInputStyles = error && style.errorInput;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            {title && (
                <label className={clsx(style.label, labelClassName)}>
                    {title}
                </label>
            )}
            <div className={style.inputContainer}>
                {icon}
                <input
                    value={inputValue}
                    onChange={handleChange}
                    className={clsx(style.input, errorInputStyles)}
                    {...rest}
                />               
            </div>
            {error && <p className={style.errorText}>{error}</p>}
        </>
    );
};

export default Input;
