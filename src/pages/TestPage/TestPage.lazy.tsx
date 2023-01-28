import React, { lazy, Suspense } from 'react';

const LazyTestPage = lazy(() => import('./TestPage'));

const TestPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTestPage {...props} />
  </Suspense>
);

export default TestPage;
