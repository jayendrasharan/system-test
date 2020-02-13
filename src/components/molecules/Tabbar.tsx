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
  onSelect
}: TabbarProps) => {
  const onOptionSelect = (event: React.MouseEvent<HTMLDivElement>): void => {
    onSelect(event.currentTarget.dataset.selection!)
  }
  return (
    <Flex maxHeight={8} alignItems='center'>
      {options.map((option, i) => <TabItem py={4} px={5} bg='border' key={i} data-selected={option} onClick={onOptionSelect} selected={option === selected}>{option}</TabItem>)}
    </Flex>
  )
}

export default Tabbar;