import React, { useContext } from 'react';
import styled from 'styled-components';
import { Flex, Image } from '../../atoms';
import { TableProps } from '../../../react-app-env';
import TableContext from '../../../contexts/TableContext';
import { arrow } from '../../../assets/icons';

const FlexTableHeader = styled(Flex).attrs(() => ({ as: 'th', justifyContent: 'center', flexGrow: 1, py: 5, backgroundColor: 'lightGrey' }))`
  text-transform: capitalize;
`

const SortIcon = styled(Image).attrs(() => ({ ml: 4, size: 2, mt: 3 }))``


const TableHeader = () => {
  const { config, columns, sortBy, sortOrder, onClickSort } = useContext<TableProps>(TableContext)
  const sortAllowedColumns = config.filter(option => option.allowSortBy).map(i => i.name)
  return (
    <Flex as='thead' flexGrow={1}>
      <Flex as='tr' flexGrow={1}>
        {columns.map((column: string, i: number) => {
          if(sortAllowedColumns.indexOf(column) !== -1) {
          return (<FlexTableHeader key={i} cursor='pointer' onClick={onClickSort} data-column-name={column}>{column} {sortBy === column ? <SortIcon src={arrow} rotate={sortOrder === 'ASC' ? 90 : 270}/> : null}</FlexTableHeader>)
          } else {
            return (<FlexTableHeader key={i}>{column}</FlexTableHeader>)
          }
        })}
      </Flex>
    </Flex>
  )
}

export default TableHeader;