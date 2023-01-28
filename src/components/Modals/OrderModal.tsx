import { Dialog } from '@headlessui/react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import Button from '~/components/Button/Button';
import FormInput from '~/components/FormInput/FormInput';
import { Doctor, Order } from '~/types/temp';
import { useAppSelector, useAppDispatch } from '~/hooks';
import { useEffect, useState } from 'react';
import { getDoctors } from '~/store/slices/doctors.slice';

export interface OrderModalProps {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
}

const OrderModal = ({ isOpen, setIsOpen }: OrderModalProps) => {
  const dispatch = useAppDispatch();
  const { doctors, doctorsLoading } = useAppSelector((state) => state.doctors);
  const { patients, patientsLoading } = useAppSelector(
    (state) => state.patients
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<Order>({
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'services',
    control,
    rules: {
      required: 'Пожалуйста добавьте хотябы одну услугу',
    },
  });

  const submitHandler: SubmitHandler<Order> = (data) => {
    console.log(data);
    reset();
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
        <Dialog.Panel className="mx-auto rounded-lg bg-white p-5 w-3/4 max-h-max">
          <Dialog.Title className="text-center mb-5 font-bold text-3xl">
            Создать новый наряд
          </Dialog.Title>
          <form
            className="flex flex-col items-start gap-y-5"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex gap-3">
              <FormInput<Order>
                type="text"
                id="doctor.fullName"
                name="doctor.fullName"
                label="Ф.И.О доктора"
                placeholder="Tashev Irmat"
                register={register}
                rules={{
                  required: 'это обязательное поле',
                }}
                errors={errors}
              />
              <FormInput<Order>
                type="text"
                id="doctor.phoneNumber"
                name="doctor.phoneNumber"
                label="Контакт доктора"
                placeholder="+998970012602"
                register={register}
                rules={{
                  required: false,
                }}
                errors={errors}
                disabled
              />
            </div>
            <div className="flex gap-3">
              <FormInput<Order>
                type="text"
                id="patient.fullName"
                name="patient.fullName"
                label="Ф.И.О пациента"
                placeholder="Tashev Irmat"
                register={register}
                rules={{
                  required: 'это обязательное поле',
                }}
                errors={errors}
              />
              <FormInput<Order>
                type="text"
                id="patient.phoneNumber"
                name="patient.phoneNumber"
                label="Контакт пациента"
                placeholder="+998970012602"
                register={register}
                rules={{
                  required: false,
                }}
                errors={errors}
                disabled
              />
              {/* <FormInput<Order>
                type="date"
                id="patient_dob"
                name="patient_dob"
                label="Дата рождение пациента"
                register={register}
                rules={{
                  required: false,
                }}
                errors={errors}
                disabled
              /> */}
            </div>
            <div className="flex gap-3">
              <FormInput<Order>
                type="text"
                id="color"
                name="color"
                label="Цвет"
                register={register}
                rules={{
                  required: false,
                }}
                errors={errors}
              />
              <FormInput<Order>
                type="text"
                id="material"
                name="material"
                label="Материал"
                register={register}
                rules={{
                  required: false,
                }}
                errors={errors}
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <div className="w-full flex items-center justify-between">
                <h4 className="text-xl capitalize font-semibold">услуги:</h4>
                <Button
                  className="btn from-green-600 to-lime-400"
                  type="button"
                  onClick={() => {
                    append({
                      name: '',
                      teethNo: '',
                      quantity: 1,
                    });
                  }}
                >
                  Добавить услугу
                </Button>
              </div>
              <div
                className={`w-full max-h-56 overflow-y-scroll ${
                  fields.length ? 'border p-2 rounded-md' : ''
                }`}
              >
                {fields.map((field, index) => {
                  return (
                    <div
                      key={field.id}
                      className="w-full flex gap-2 items-center"
                    >
                      <div className="flex gap-2">
                        <FormInput<Order>
                          type="text"
                          id={`services.${index}.name`}
                          name={`services.${index}.name`}
                          label={`Название услуги`}
                          register={register}
                          rules={{
                            required: 'это обязательное поле',
                          }}
                          errors={errors}
                        />
                        <FormInput<Order>
                          type="text"
                          id={`services.${index}.teethNo`}
                          name={`services.${index}.teethNo`}
                          label={`номер зуба`}
                          register={register}
                          rules={{
                            required: 'это обязательное поле',
                          }}
                          errors={errors}
                        />
                        <FormInput<Order>
                          type="number"
                          id={`services.${index}.quantity`}
                          name={`services.${index}.quantity`}
                          label={`количество`}
                          register={register}
                          rules={{
                            required: 'это обязательное поле',
                          }}
                          errors={errors}
                        />
                      </div>
                      <Button
                        className="w-full btn from-red-600 to-rose-400"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Удалить
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex justify-end gap-4">
              <Button
                className="mt-5 btn from-red-600 to-rose-400"
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  reset();
                }}
              >
                отменить
              </Button>
              <Button
                className="mt-5 btn from-blue-600 to-cyan-400"
                type="submit"
              >
                создать наряд
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default OrderModal;
