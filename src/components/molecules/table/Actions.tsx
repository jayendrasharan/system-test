import React from 'react';
import styled from 'styled-components';
import { Flex, Image, Text } from '../../atoms';
import { trash, edit } from '../../../assets/icons';
import { TableActionsProps } from '../../../react-app-env';

const PointerImage = styled(Image)`cursor: pointer;`
const PointerText = styled(Text)`cursor: pointer;min-width: 80px;`
const TableActions = ({
  onEdit, onStatusChange,
  onDelete, id, currentState
}: TableActionsProps) => {
  return (
    <Flex>
      <PointerImage px={3} data-row-id={id} src={edit} size={3} onClick={onEdit}/>
      <PointerImage px={3} data-row-id={id} src={trash} size={3} onClick={onDelete}/>
      <PointerText px={3} color='blue' data-row-id={id} onClick={onStatusChange}>{currentState === 'open' ? 'done' : 're-open'}</PointerText>
    </Flex>
  )
}

export default TableActions;