import React from 'react';
import { TableBody } from '@material-ui/core';
import TodoListEmpty from '../TodoListEmpty';
import TodoListBodyRow from '../TodoListBodyRow';

export default function TodoListBody(props) {
  if (props.tasks?.length > 0) {
    return (
      <TableBody>
        {props.tasks.map(task => {
          return (
            <TodoListBodyRow
              task={task}
              key={task.id}
              deleteTask={props.deleteTask}
              editTask={props.editTask}
              changeTaskStatus={props.changeTaskStatus}
            />
          );
        })}
      </TableBody>
    );
  } else {
    return <TodoListEmpty />;
  }
}
