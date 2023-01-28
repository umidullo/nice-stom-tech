import React, { lazy, Suspense } from 'react';

const LazyLoginPage = lazy(() => import('./LoginPage'));

const LoginPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLoginPage {...props} />
  </Suspense>
);

export default LoginPage;
