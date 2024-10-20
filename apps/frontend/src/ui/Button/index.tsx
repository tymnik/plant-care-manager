import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import style from './index.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'before' | 'after';
  variant?: 'primary' | 'secondary' | 'icon' | 'ghost';
}

const Button = ({
  children,
  icon,
  iconPosition = 'before',
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) => {
  const buttonStyle = clsx(
    style.button,
    style[variant],
    className);
  
  return (
    <button className={buttonStyle} {...rest}>
      {iconPosition === 'before' ? icon : null}
      {children}
      {iconPosition === 'after' ? icon : null}
    </button>
  );
};

export default Button