import React, { Suspense } from 'react';
import SimpleLoader from '../content-loaders/SimpleLoader';

const WithSuspenseLoader = (Component, Loader) => (props) => {
  return (
    <Suspense fallback={Loader ? Loader : <SimpleLoader />}>
      <Component {...props}/>
    </Suspense>
  )
}

export default WithSuspenseLoader;