import React, { lazy, Suspense } from 'react';

const LazyLabPage = lazy(() => import('./LabPage'));

const LabPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLabPage {...props} />
  </Suspense>
);

export default LabPage;
