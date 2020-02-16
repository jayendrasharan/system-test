import React from 'react';
import { Layout } from './components/templates';
import HomePage from './pages/HomePage';
import { WithSuspenseLoader } from './helpers';

const App: React.FC = () => {
  return (
      <Layout>
        <HomePage />
      </Layout>
  );
}

export default WithSuspenseLoader(App);
