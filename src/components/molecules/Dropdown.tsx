import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Flex, Image } from '../atoms';
import { DropdownProps, FlexProps } from '../../react-app-env';
import { arrow } from '../../assets/icons';


interface ListItemProps extends FlexProps {
  selected: boolean;
}

const FlexContainer = styled(Flex)`
  position: relative;
  cursor: pointer;
`

const UnorderList = styled(Flex).attrs(() => ({ as: 'ul', alignItems: 'flex-start' }))`
  position: absolute;
  z-index: 1;
`

const ListElement = styled(Flex).attrs(() => ({ as: 'li', py: 4, px: 7 }))<ListItemProps>`
  width: 100%;
  ${({ selected }) => selected && css`
    background-color: ${({ theme: { colors }}) => colors.border};
  `}
  &:hover {
    background-color: ${({ theme: { colors }}) => colors.border};
  }
`

const Dropdown = ({
  selected, options,
  onSelect, disabled
}: DropdownProps) => {
  const [open, updateOpen] = useState<boolean>(false);
  const onOptionClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if(!disabled) {
      onSelect(event.currentTarget.dataset.selection!)
      onClickToggle()
    }
  }
  const onClickToggle = () => {
    updateOpen(!open)
  }
  const selectedToLabel = options.find(option => option.id === selected)
  return (
    <FlexContainer minWidth={10} maxWidth={11} flexDirection='column'>
      <Flex bg='border' justifyContent='space-around' borderRadius={2} p={5} onClick={onClickToggle}>{selectedToLabel?.label} <Image ml={4} rotate={open ? 270 : 90} src={arrow} px={3} size={3}/></Flex>
      <FlexContainer>
        {open ? <UnorderList flexDirection='column' backgroundColor='white' px={0} m={0}>
          {options.map(((option, i) => (
            <ListElement key={i} onClick={onOptionClick} selected={option.id === selected} data-selection={option.id}>{option.label}</ListElement>)
          ))}
        </UnorderList> : null}
      </FlexContainer>
    </FlexContainer>
  )
}

export default Dropdown;