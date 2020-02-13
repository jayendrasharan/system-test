import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex, Image } from '../atoms';
import { DropdownProps } from '../../react-app-env';
import { arrow } from '../../assets/icons';

const FlexContainer = styled(Flex)`
  position: relative;
  cursor: pointer;
`

const UnorderList = styled(Flex).attrs(() => ({ as: 'ul', alignItems: 'flex-start' }))`
  position: absolute;
  z-index: 1;
`

const ListElement = styled(Flex).attrs(() => ({ as: 'li', py: 4, px: 7 }))`
  width: 100%;
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
    <FlexContainer minWidth={10} flexDirection='column'>
      <Flex bg='border' borderRadius={2} p={5} onClick={onClickToggle}>{selected} <Image ml={4} rotate={open ? 270 : 90} src={arrow} px={3} size={3}/></Flex>
      <FlexContainer>
        {open ? <UnorderList flexDirection='column' backgroundColor='white' px={0} m={0}>
          {options.map(((option, i) => (
            <ListElement key={i} onClick={onOptionClick} data-selection={option.id}>{option.label}</ListElement>)
          ))}
        </UnorderList> : null}
      </FlexContainer>
    </FlexContainer>
  )
}

export default Dropdown;