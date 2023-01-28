import { Route, Routes } from 'react-router-dom';
import {
  ClinicPage,
  DoctorsPage,
  LabPage,
  LoginPage,
  PatientsPage,
} from '~/pages';
import TestPage from '~/pages/TestPage/TestPage';
import Layout from './Layout';

const App = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/'} element={<Layout />}>
        <Route path={'clinic'} element={<ClinicPage />} />
        <Route path={'lab'} element={<LabPage />} />
        <Route path={'doctors'} element={<DoctorsPage />} />
        <Route path={'patients'} element={<PatientsPage />} />
        <Route path={'test'} element={<TestPage />} />
      </Route>
    </Routes>
  );
};
export default App;
