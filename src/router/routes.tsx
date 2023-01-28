import {
  BeakerIcon,
  IdentificationIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { ClinicPage, DoctorsPage, LabPage, PatientsPage } from '~/pages';
import TestPage from '~/pages/TestPage/TestPage';

export const ROUTES = [
  {
    path: 'clinic',
    name: 'clinic',
    icon: <IdentificationIcon className="h-6 w-6" />,
    component: <ClinicPage />,
    permission: ['super-admin'],
  },
  {
    path: 'lab',
    name: 'lab',
    icon: <BeakerIcon className="h-6 w-6" />,
    component: <LabPage />,
    permission: ['super-admin'],
  },
  {
    path: 'doctors',
    name: 'doctors',
    icon: <UsersIcon className="h-6 w-6" />,
    component: <DoctorsPage />,
    permission: ['super-admin'],
  },
  {
    path: 'patients',
    name: 'patients',
    icon: <UsersIcon className="h-6 w-6" />,
    component: <PatientsPage />,
    permission: ['super-admin'],
  },
  {
    path: 'test',
    name: 'test',
    icon: <UsersIcon className="h-6 w-6" />,
    component: <TestPage />,
    permission: ['super-admin'],
  },
];
