import React from 'react';
import styled from 'styled-components';
import { Text, Flex } from '../../atoms';
import { TableActions } from '.'

const TableData = styled(Text).attrs(() => ({ as: 'td', flexGrow: 1, justifyContent: 'center' }))`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 15%;
`

const TableRowContainer = styled(Flex).attrs(() => ({ as: 'tr', flexGrow: 1, my: 5 }))`

`

// type TableRowProps = Pick<TaskType, 'id | title | priority | createdAt | dueDate'>;
const TableRow = ({onEdit, onDelete, onStatusChange, ...props}) => {
  return (
    <TableRowContainer as='tr' flexGrow={1} my={5}>
      {Object.keys(props).map((i, index) => <TableData key={index}>{props[i]}</TableData>)}
      <TableActions onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} id={props.id}/>
    </TableRowContainer>
  )
}

export default TableRow;