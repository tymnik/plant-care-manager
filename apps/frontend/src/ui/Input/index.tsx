import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

import style from './index.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelClassName?: string;
    title?: string;
    icon?: ReactNode;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    title,
    icon,
    error,
    labelClassName = '',
    ...rest
}, ref) => {
    const errorInputStyles = error && style.errorInput;

    return (
        <>
            {title && (
                <label className={clsx(style.label, labelClassName)}>
                    {title}
                </label>
            )}
            <div className={style.inputContainer}>
                <input
                    ref={ref}
                    className={clsx(style.input, errorInputStyles)}
                    {...rest}
                />
                {icon}
            </div>
            {error && <p className={style.errorText}>{error}</p>}
        </>
    );
});

export default Input;
