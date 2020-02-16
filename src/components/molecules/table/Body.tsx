import React, { useContext, Fragment } from 'react';
import { Flex, Text } from '../../atoms';
import { TableRow } from '.';
import TableContext from '../../../contexts/TableContext';
import { TaskType } from '../../../react-app-env';

const TableBody = () => {
  const { data, onEdit, onDelete, onStatusChange } = useContext(TableContext)

  const renderData = (tableData: TaskType[]) => (
    tableData.map(({ id, title, priority, dueDate, createdAt, currentState }: TaskType) => (
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
  )
  return (
    <Flex as='tbody' width='100%' flexDirection='column'>
      {
        Array.isArray(data) ? renderData(data) : Object.keys(data).map(option => (
          <Fragment>
            <Text as='tr' alignSelf='center' py={5} fontWeight='bolder' fontSize={4}>{option}</Text>
            {renderData(data[option])}
          </Fragment>
          )
        )
      }
    </Flex>
  )
}

export default TableBody;