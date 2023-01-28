import { Combobox } from '@headlessui/react';
import React, { useState } from 'react';
import { Column } from 'react-table';
import Button from '~/components/Button/Button';
import OrderModal from '~/components/Modals/OrderModal';
import Table from '~/components/Table/Table';
import { Order } from '~/types/temp';

const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
];

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

  return (
    <section className="section">
      <Button onClick={() => setIsOpen(true)}>Создать новый наряд</Button>
      <OrderModal isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* <Table columns={columns} data={data} /> */}
    </section>
  );
};
export default ClinicPage;
