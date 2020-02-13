import React from 'react';
import { Flex } from '../atoms';
import { TableHeader, TableBody } from '../molecules/table';

const Table = () => {
  return (
    <Flex as='table' minWidth='100%' justifyContent='center' my={5} flexDirection='column'>
      <TableHeader />
      <TableBody />
    </Flex>
  )
}

export default Table;