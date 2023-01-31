import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Column } from 'react-table';
import Button from '~/components/Button/Button';
import DoctorModal from '~/components/Modals/DoctorModal';
import Table from '~/components/Table/Table';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { deleteDoctor, getDoctors } from '~/store/slices/doctors.slice';
import { Doctor } from '~/types/temp';

const DoctorsPage = () => {
  const dispatch = useAppDispatch();
  const { doctorsLoading, doctors } = useAppSelector((state) => state.doctors);

  console.log(doctors);

  const [isOpen, setIsOpen] = useState(false);
  const [isPatchModalOpen, setIsPatchModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getDoctors());
  }, []);

  const columns: readonly Column<Doctor>[] = React.useMemo(
    () => [
      {
        Header: <p className="text-center">ФИО доктора</p>,
        accessor: 'fullName',
        Cell: (props) => (
          <p className="text-center font-bold ">{props.value}</p>
        ),
      },
      {
        Header: <p className="text-center">номер телефона</p>,
        accessor: 'phoneNumber',
        Cell: (props) => (
          <div className="flex justify-center">
            <a
              href={`tel:${props.value}`}
              className="text-center text-blue-600"
            >
              +{props.value}
            </a>
          </div>
        ),
      },
      {
        Header: <p className="text-center">Дата рождения</p>,
        accessor: 'dob',
        Cell: (props) => (
          <div className="flex justify-center">
            {new Date(props.value).toLocaleDateString()}
          </div>
        ),
      },
      {
        Header: <p className="text-center">Настройки</p>,
        id: 'settings',
        Cell: (props: any) => (
          <div className="flex items-center justify-center gap-3 text-gray-600">
            <button
              className="hover:text-blue-500"
              onClick={() => setIsPatchModalOpen(true)}
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button
              className="hover:text-red-500"
              onClick={() =>
                dispatch(deleteDoctor(props.cell.row.original._id))
              }
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const data: Doctor[] = React.useMemo(
    () => (doctors ? doctors : []),
    [doctors]
  );

  return (
    <section className="section">
      <div className="flex justify-between">
        <h1 className="text-3xl">Докторы</h1>
        <Button onClick={() => setIsOpen(true)}>создать доктора</Button>
      </div>
      <div className="bg-white mt-5 p-5 rounded-md border">
        {doctorsLoading ? (
          <p>loading...</p>
        ) : (
          <Table columns={columns} data={data} />
        )}
      </div>
      <DoctorModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default DoctorsPage;
