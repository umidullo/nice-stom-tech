import { useController, UseControllerProps } from 'react-hook-form';

import { Listbox as ListBox } from '@headlessui/react';
import { Doctor } from '~/types/temp';

type Props = {
  doctor: Doctor[];
};

export const Listbox = (props: Props & UseControllerProps) => {
  const {
    field: { value, onChange },
  } = useController(props);

  const { doctor } = props;

  return (
    <>
      <ListBox value={value} onChange={onChange}>
        <ListBox.Button>
          {value ? (value as Doctor).fullName : 'Select Person'}
        </ListBox.Button>
        <ListBox.Options>
          {doctor.map((doctor) => (
            <ListBox.Option key={doctor._id} value={doctor}>
              {doctor.fullName}
            </ListBox.Option>
          ))}
        </ListBox.Options>
      </ListBox>
    </>
  );
};
