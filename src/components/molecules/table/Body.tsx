import React, { useContext } from 'react';
import { Flex } from '../../atoms';
import { TableRow } from '.';
import TableContext from '../../../contexts/TableContext';

const TableBody = () => {
  const { data, onEdit, onDelete, onStatusChange } = useContext(TableContext)
  return (
    <Flex as='tbody' width='100%' flexDirection='column'>
      {
        data.map(({ id, title, priority, dueDate, createdAt }) => (
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
          />
          )
        )
      }
    </Flex>
  )
}

export default TableBody;