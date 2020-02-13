import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex } from '../atoms';
import { DropdownProps } from '../../react-app-env';

const FlexContainer = styled(Flex)`
  position: relative;
  cursor: pointer;
`

const UnorderList = styled(Flex).attrs(() => ({ as: 'div' }))`
  position: absolute;
`

const ListElement = styled(Flex).attrs(() => ({ as: 'li', p: 2 }))`
  &:hover {
    background-color: ${({ theme: { colors }}) => colors.border};
  }
`

const Dropdown = ({
  selected, options,
  onSelect
}: DropdownProps) => {
  const [open, updateOpen] = useState<boolean>(false);
  const onOptionClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    onSelect(event.currentTarget.dataset.selection!)
    onClickToggle()
  }
  const onClickToggle = () => {
    updateOpen(!open)
  }
  return (
    <FlexContainer flexDirection='column'>
      <Flex bg='border' borderRadius={2} p={2} onClick={onClickToggle}>{selected}</Flex>
      <FlexContainer>
        {open ? <UnorderList flexDirection='column'>
          {options.map(((option, i) => (
            <ListElement key={i} onClick={onOptionClick} data-selection={option}>{option}</ListElement>)
          ))}
        </UnorderList> : null}
      </FlexContainer>
    </FlexContainer>
  )
}

export default Dropdown;