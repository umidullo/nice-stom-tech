import { Combobox, Listbox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '~/hooks';
import { getDoctors } from '~/store/slices/doctors.slice';
import { Doctor } from '~/types/temp';

const TestPage = () => {
  const dispatch = useAppDispatch();
  const { doctors } = useAppSelector((state) => state.doctors);
  console.log(doctors);
  useEffect(() => {
    dispatch(getDoctors()).then((item) => setSelectedPerson(item.payload[0]));
  }, []);

  const [selectedPerson, setSelectedPerson] = useState<Doctor | null>();
  console.log(selectedPerson);

  return (
    <section className="section">
      {selectedPerson ? (
        <div>
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <Listbox.Button>{selectedPerson.fullName}</Listbox.Button>
            <Listbox.Options>
              {doctors.map((person) => (
                <Listbox.Option key={person._id} value={person}>
                  {person.fullName}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      ) : (
        'loading...'
      )}
    </section>
  );
};

export default TestPage;
