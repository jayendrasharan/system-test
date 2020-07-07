import React from 'react';
import App from '../components/app/App';
import ToDoPage from '../containers/pages/todoPage';

const routes = [
  {
    path: ['/login', '/logout', '', '/'],
    authenticated: false,
    name: 'index-page',
    action: context => (
      <App context={context}>
        <ToDoPage context={context} />
      </App>
    )
  },
  {
    path: '(.*)',
    authenticated: false,
    action: () => (
      <App>
        <h1>404 Not Found.</h1>
      </App>
    )
  }
];

export { routes };
