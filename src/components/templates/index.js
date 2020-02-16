import { lazy } from 'react';

const Home = lazy(() => import('./Home'))
const Layout = lazy(() => import('./Layout'));

export { Home, Layout };