import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Column } from 'react-table';
import Button from '~/components/Button/Button';
import PatientModal from '~/components/Modals/PatientModal';
import Table from '~/components/Table/Table';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { Patient } from '~/types/temp';
import { deletePatient, getPatients } from '~/store/slices/patients.slice';

const PatientsPage = () => {
  const dispatch = useAppDispatch();
  const { patients, patientsLoading } = useAppSelector(
    (state) => state.patients
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getPatients());
  }, []);

  const columns: readonly Column<Patient>[] = React.useMemo(
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
              onClick={() => {
                console.log(props.cell.row.original._id);
              }}
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>
            <button
              className="hover:text-red-500"
              onClick={() =>
                dispatch(deletePatient(props.cell.row.original._id))
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
  const data: Patient[] = React.useMemo(
    () => (patients ? patients : []),
    [patients]
  );

  return (
    <section className="section">
      <div className="flex justify-between">
        <h1 className="text-3xl">Пациенты</h1>
        <Button onClick={() => setIsOpen(true)}>создать пациента</Button>
      </div>
      <div className="bg-white mt-5 p-5 rounded-md border">
        {patientsLoading ? (
          <p>loading...</p>
        ) : (
          <Table columns={columns} data={data} />
        )}
      </div>
      <PatientModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default PatientsPage;
