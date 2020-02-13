import React from 'react';
import { ThemeProvider } from 'styled-components'
import theme from './themes/default';
import Layout from './components/templates/Layout';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <HomePage />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
