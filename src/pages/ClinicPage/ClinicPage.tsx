import { Combobox } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Column } from 'react-table';
import Button from '~/components/Button/Button';
import FormInput from '~/components/FormInput/FormInput';
import OrderModal from '~/components/Modals/OrderModal';
import Table from '~/components/Table/Table';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { getDoctors } from '~/store/slices/doctors.slice';
import { Doctor, Order, OrderTest } from '~/types/temp';
import { getPatients } from '../../store/slices/patients.slice';

const ClinicPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const columns: readonly Column<Order>[] = React.useMemo(
    () => [
      {
        Header: <p className="text-center">ФИО доктора</p>,
        accessor: 'doctor',
        Cell: (props) => (
          <p className="text-center font-bold ">{props.fullName}</p>
        ),
      },
      {
        Header: <p className="text-center">ФИО пациента</p>,
        accessor: 'patient',
        Cell: (props) => (
          <p className="flex justify-center">{props.fullName}</p>
        ),
      },
    ],
    []
  );

  // const data: Order[] = React.useMemo(() => (orders ? orders : []), [orders]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<OrderTest>({
    mode: 'onSubmit',
  });

  const { doctors } = useAppSelector((state) => state.doctors);
  const { patients } = useAppSelector((state) => state.patients);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDoctors());
    dispatch(getPatients());
  }, []);

  const submitHandler: SubmitHandler<OrderTest> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <section className="section">
      <Button onClick={() => setIsOpen(true)}>Создать новый наряд</Button>
      {isOpen ? <OrderModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
      {/* <Table columns={columns} data={data} /> */}
      <form
        className="flex flex-col items-start gap-y-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex gap-5">
          <div className="flex flex-col">
            <p>doctor</p>
            <select
              {...register('doctorId', {
                required: 'это обязательное поле',
              })}
              name="doctorId"
              id="doctorId"
              className="border p-2"
            >
              <option value="" defaultChecked></option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
            <span>{errors.doctorId?.message}</span>
          </div>
          <div className="flex flex-col">
            <p>patient</p>
            <select
              {...register('patientId', {
                required: 'это обязательное поле',
              })}
              name="patientId"
              id="patientId"
              className="border p-2"
            >
              <option value="" defaultChecked></option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.fullName}
                </option>
              ))}
            </select>
            <span>{errors.patientId?.message}</span>
          </div>
        </div>
        <Button className="mt-5 btn from-blue-600 to-cyan-400" type="submit">
          создать наряд
        </Button>
      </form>
    </section>
  );
};
export default ClinicPage;
