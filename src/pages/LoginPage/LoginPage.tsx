import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '~/components/Button/Button';
import FormInput from '~/components/FormInput/FormInput';

type ILogin = {
  login: string;
  password: string;
};

const LoginPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ILogin>({ mode: 'onSubmit' });

  const submitHandler: SubmitHandler<ILogin> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <section className="w-screen h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white py-5 px-8 border rounded-xl shadow-lg flex flex-col items-center">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-80 flex flex-col "
        >
          <FormInput<ILogin>
            type="text"
            id="login"
            name="login"
            label="Логин"
            placeholder="stomedical_4582"
            register={register}
            rules={{
              required: 'это обязательное поле',
            }}
            errors={errors}
          />
          <div className="w-full flex gap-2 items-center justify-between mb-5">
            <FormInput<ILogin>
              type={visible ? 'text' : 'password'}
              id="password"
              name="password"
              label="Пароль"
              register={register}
              rules={{
                required: 'это обязательное поле',
              }}
              errors={errors}
              className="flex-1"
            />
            <button type="button" onClick={() => setVisible((prev) => !prev)}>
              {visible ? (
                <EyeIcon className="w-6 h-6" />
              ) : (
                <EyeSlashIcon className="w-6 h-6" />
              )}
            </button>
          </div>
          <Button>Войти</Button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
