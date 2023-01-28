import { ErrorMessage } from '@hookform/error-message';
import get from 'lodash.get';
import {
  DeepMap,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import Input, { InputProps } from '~/components/Input/Input';

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<FieldErrorsImpl<DeepMap<TFormValues, FieldError>>>;
} & Omit<InputProps, 'name'>;
export const FormInput = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  register,
  rules,
  errors,
  label,
  id,
  disabled,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div
      className={`h-24 ${className} ${disabled ? 'opacity-50' : ''}`}
      aria-live="polite"
    >
      <label htmlFor={id} className="text-lg font-semibold">
        {label}
      </label>
      <Input
        disabled={disabled}
        id={id}
        name={name}
        aria-invalid={hasError}
        errorMsg={hasError}
        className={`${hasError}`}
        label={label}
        {...props}
        {...(register && register(name, rules))}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <p className="mt-1 text-sm text-left block text-red-600">{message}</p>
        )}
      />
    </div>
  );
};

export default FormInput;
