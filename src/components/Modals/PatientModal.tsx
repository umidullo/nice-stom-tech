import { Dialog } from '@headlessui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '~/components/Button/Button';
import FormInput from '~/components/FormInput/FormInput';
import { useAppDispatch } from '~/hooks';
import { createPatient } from '~/store/slices/patients.slice';
import { Patient } from '~/types/temp';

export interface OrderModalProps {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
}

const OrderModal = ({ isOpen, setIsOpen }: OrderModalProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Patient>({ mode: 'onSubmit' });

  const submitHandler: SubmitHandler<Patient> = (data) => {
    console.log(data);
    dispatch(createPatient(data));
    // reset();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        reset();
      }}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto rounded-lg bg-white p-5 w-fit max-h-max">
          <Dialog.Title className="text-center mb-5 font-bold text-3xl">
            Создать нового пациента
          </Dialog.Title>
          <form
            className="flex flex-col items-center gap-y-5"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex flex-col w-full">
              <FormInput<Patient>
                type="text"
                id="fullName"
                name="fullName"
                label="Ф.И.О пациента"
                placeholder="Tashev Irmat"
                register={register}
                rules={{
                  required: 'это обязательное поле',
                }}
                errors={errors}
              />
              <FormInput<Patient>
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                label="Контакт пациента"
                placeholder="+998970012602"
                register={register}
                rules={{
                  required: 'это обязательное поле',
                }}
                errors={errors}
              />
              <FormInput<Patient>
                type="date"
                id="dob"
                name="dob"
                label="Дата рождение пациента"
                register={register}
                rules={{
                  required: 'это обязательное поле',
                }}
                errors={errors}
              />
            </div>
            <div className="w-full flex justify-between">
              <Button
                className="btn from-red-600 to-rose-400"
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  reset();
                }}
              >
                отменить
              </Button>
              <Button className="btn from-blue-600 to-cyan-400" type="submit">
                создать пациента
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OrderModal;
