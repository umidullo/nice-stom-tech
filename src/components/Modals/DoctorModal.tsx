import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from '~/components/Button/Button';
import FormInput from '~/components/FormInput/FormInput';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { createDoctor } from '~/store/slices/doctors.slice';
import { Doctor } from '~/types/temp';

export interface OrderModalProps {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
}

const DoctorModal = ({ isOpen, setIsOpen }: OrderModalProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Doctor>({ mode: 'onSubmit' });

  const submitHandler: SubmitHandler<Doctor> = async (data) => {
    dispatch(createDoctor({ ...data, phoneNumber: +data.phoneNumber }));
    reset();
    setIsOpen(false);
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
            Создать нового доктора
          </Dialog.Title>
          <form
            className="flex flex-col items-center gap-y-2"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex flex-col w-full">
              <FormInput<Doctor>
                type="text"
                id="fullName"
                name="fullName"
                label="Ф.И.О доктора"
                placeholder="Tashev Irmat"
                register={register}
                rules={{
                  required: 'это обязательное поле',
                }}
                errors={errors}
              />
              <FormInput<Doctor>
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                label="Контакт доктора"
                register={register}
                rules={{
                  required: 'это обязательное поле',
                }}
                errors={errors}
              />
              <FormInput<Doctor>
                type="date"
                id="dob"
                name="dob"
                label="Контакт доктора"
                placeholder="+998970012602"
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
                создать доктора
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DoctorModal;
