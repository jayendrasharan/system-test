import React, { lazy } from 'react';
import { WithSuspenseLoader } from '../../helpers';

const ActionsContainer = WithSuspenseLoader(lazy(() => import('./ActionsContainer')), <div>Loading...,</div>);
const Dropdown = WithSuspenseLoader(lazy(() => import('./Dropdown')), <div>Loading...,</div>)
const InputWithText = WithSuspenseLoader(lazy(() => import('./InputWithText')), <div>Loading...,</div>);
const Tabbar = WithSuspenseLoader(lazy(() => import('./Tabbar')), <div>Loading...,</div>)

export { ActionsContainer, Dropdown, InputWithText, Tabbar };