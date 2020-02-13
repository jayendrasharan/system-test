import React from 'react';
import { Flex, Text } from '../atoms';
import { Dropdown, Tabbar } from '../molecules';
import { Table } from '../organisms';
import { DropdownProps, TaskType } from '../../react-app-env';

interface HomeProps {
  groupBy: DropdownProps,
  data: TaskType[];
}

const Home = ({
  groupBy: {
    options,
    selected,
    onSelect
  },
  data
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
        <Table />
      </Flex>
    </Flex>
  )
}

export default Home;