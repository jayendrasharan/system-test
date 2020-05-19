import React, { Fragment } from 'react';
import ToDo from '../../../components/todo/ToDo';

const ToDoPage = props => (
  <Fragment>
    <ToDo {...props} />
  </Fragment>
);

export default ToDoPage;
