import React from 'react';
import styled, { css } from 'styled-components';
import { Text, Flex } from '../../atoms';
import { TableActions } from '.'

const TableData = styled(Text).attrs(() => ({ as: 'td', flexGrow: 1, justifyContent: 'center' }))`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 15%;
`

const TableRowContainer = styled(Flex).attrs(() => ({ as: 'tr', flexGrow: 1, my: 1 }))`
  position: relative;
  ${({ done }) => done && css`
    background-color: ${({ theme: { colors }}) => colors.green};
    &:after {
      content: '';
      position: absolute;
      width: 80%;
      left: 0px;
      height: 1px;
      top: 50%;
      background-color: ${({ theme: { colors }}) => colors.darkGrey};
    }
  `}
`

// type TableRowProps = Pick<TaskType, 'id | title | priority | createdAt | dueDate'>;
const TableRow = ({onEdit, onDelete, onStatusChange, currentState, id: rowId, ...props}) => {
  return (
    <TableRowContainer as='tr' flexGrow={1} py={5} px={3} borderRadius={3} done={currentState === 'done'}>
      {Object.keys(props).map((i, index) => <TableData key={index}>{props[i]}</TableData>)}
      <TableActions onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} id={rowId} currentState={currentState}/>
    </TableRowContainer>
  )
}

export default TableRow;