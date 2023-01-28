import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  $type?: 'primary' | 'success' | 'info' | 'warn' | 'error';
  variant?: 'button' | 'outline';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  isLoading = false,
  onClick,
  children,
  $type = 'primary',
  variant = 'button',
  ...props
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={`${styles[variant]} ${styles[$type]} ${styles.className}`}
    disabled={isLoading ? true : false}
    {...props}
  >
    {isLoading ? 'loading...' : children}
  </button>
);

export default Button;
