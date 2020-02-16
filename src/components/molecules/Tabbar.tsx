import React from 'react';
import styled, { css } from 'styled-components';
import { Flex } from '../atoms';
import { TabbarProps, FlexProps } from '../../react-app-env';


interface TabItemProps extends FlexProps {
  selected: boolean;
}
const TabItem = styled(Flex)<TabItemProps>`
  cursor: pointer;
  ${({ selected }) => selected && css`
    background-color: white;
  `}
`

const Tabbar = ({
  selected, options,
  onSelect, disabled
}: TabbarProps) => {
  const onOptionSelect = (event: React.MouseEvent<HTMLDivElement>): void => {
    if(!disabled) {
      onSelect(event.currentTarget.dataset.selection!)
    }
  }
  return (
    <Flex maxHeight={8} alignItems='center'>
      {options.map((option, i) => <TabItem py={4} px={5} bg='border' key={i} data-selection={option.id} onClick={onOptionSelect} selected={option.id === selected}>{option.label}</TabItem>)}
    </Flex>
  )
}

export default Tabbar;