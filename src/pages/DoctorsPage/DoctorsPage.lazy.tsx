import React, { lazy, Suspense } from 'react';

const LazyDoctorsPage = lazy(() => import('./DoctorsPage'));

const DoctorsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDoctorsPage {...props} />
  </Suspense>
);

export default DoctorsPage;
