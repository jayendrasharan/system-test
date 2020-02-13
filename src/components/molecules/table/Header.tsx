import React, { useContext } from 'react';
import styled from 'styled-components';
import { Flex } from '../../atoms';
import { TableProps } from '../../../react-app-env';
import TableContext from '../../../contexts/TableContext';

const FlexTableHeader = styled(Flex).attrs(() => ({ as: 'th', justifyContent: 'center', flexGrow: 1 }))`
  text-transform: capitalize;
`
const TableHeader = () => {
  const { config, columns, data } = useContext<TableProps>(TableContext)
  return (
    <Flex as='thead' flexGrow={1}>
      <Flex as='tr' flexGrow={1}>
        {columns.map((column: string, i: number) => <FlexTableHeader key={i}>{column}</FlexTableHeader>)}
      </Flex>
    </Flex>
  )
}

export default TableHeader;