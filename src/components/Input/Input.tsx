import { FC, forwardRef, InputHTMLAttributes } from 'react';

export type InputProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
  errorMsg?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    { id, name, label, className = '', placeholder, errorMsg, ...props },
    ref
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        aria-label={label}
        placeholder={placeholder}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 min-w-[240px] ${className} ${
          errorMsg ? 'bg-red-100 border-none' : ''
        }`}
        {...props}
      />
    );
  }
);

export default Input;
