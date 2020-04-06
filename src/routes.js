import React from 'react';
import Loadable from 'react-loadable';

export default function createRoutes() { 
  return [
    { 
      path: '/',
      exact: true,
      component: Loadable({
        loader: () => import('./containers/tasksDashboard'),
        loading() {
          return <div id="loader" className="spinner"></div>;
        }
      }),
    },
    { 
      path: '/allTasks',
      exact: true,
      component: Loadable({
        loader: () => import('./containers/showAllTasks'),
        loading() {
          return <div id="loader" className="spinner"></div>;
        }
      }),
    },           
  ];
}

