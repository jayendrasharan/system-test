import React from 'react';
import { Flex, Text } from '../atoms';
import { Dropdown, Tabbar } from '../molecules';
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
    <Flex flexDirection='column' width='100%'>
      <Flex justifyContent='space-between' alignItems='flex-end'>
        <Tabbar 
          selected={selected}
          options={options}
          onSelect={onSelect}
        />
        <Flex flexDirection='column'>
          <Text mb={4}>Group By</Text>
          <Dropdown 
            selected={selected}
            options={options}
            onSelect={onSelect}
          />
        </Flex>
      </Flex>
      <Flex>
        
      </Flex>
    </Flex>
  )
}

export default Home;