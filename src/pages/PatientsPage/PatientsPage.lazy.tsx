import React, { lazy, Suspense } from 'react';

const LazyPatientsPage = lazy(() => import('./PatientsPage'));

const PatientsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPatientsPage {...props} />
  </Suspense>
);

export default PatientsPage;
