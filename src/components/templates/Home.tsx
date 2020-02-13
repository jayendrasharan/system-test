import React from 'react';
import { Flex } from '../atoms';
import { Dropdown } from '../molecules';
import { DropdownProps } from '../../react-app-env';

interface HomeProps {
  groupBy: DropdownProps
}

const Home = ({
  groupBy: {
    options,
    selected,
    onSelect
  }
}: HomeProps) => {
  return (
    <Flex flexDirection='column'>
      <Dropdown 
        selected={selected}
        options={options}
        onSelect={onSelect}
      />
    </Flex>
  )
}

export default Home;