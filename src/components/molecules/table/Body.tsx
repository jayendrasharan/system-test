import React, { useContext } from 'react';
import { Flex } from '../../atoms';
import { TableRow } from '.';
import TableContext from '../../../contexts/TableContext';
import { TaskType } from '../../../react-app-env';

const TableBody = () => {
  const { data, onEdit, onDelete, onStatusChange } = useContext(TableContext)
  return (
    <Flex as='tbody' width='100%' flexDirection='column'>
      {
        data.map(({ id, title, priority, dueDate, createdAt, currentState }: TaskType) => (
          <TableRow
            key={id}
            title={title}
            priority={priority}
            createdAt={createdAt}
            dueDate={dueDate}
            id={id}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
            currentState={currentState}
          />
          )
        )
      }
    </Flex>
  )
}

export default TableBody;