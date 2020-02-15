import { lazy } from 'react';

const Table = lazy(() => import('./Table'))
const ModalForm = lazy(() => import('./ModalForm'))
const TaskEntryForm = lazy(() => import('./TaskEntryForm'))

export { Table, TaskEntryForm, ModalForm };