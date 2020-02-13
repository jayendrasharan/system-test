import React from 'react';
import { Flex, Text } from '../atoms';
import { Dropdown, Tabbar } from '../molecules';
import { Table } from '../organisms';
import { DropdownProps, TaskType } from '../../react-app-env';

interface HomeProps {
  groupBy: DropdownProps;
  tabbar: DropdownProps;
  data: TaskType[];
}

const Home = ({
  groupBy,
  tabbar
}: HomeProps) => {
  return (
    <Flex flexDirection='column' width='100%'>
      <Flex justifyContent='space-between' alignItems='flex-end'>
        <Tabbar {...tabbar}/>
        <Flex flexDirection='column'>
          <Text mb={4}>Group By</Text>
          <Dropdown {...groupBy}/>
        </Flex>
      </Flex>
      <Flex>
        <Table />
      </Flex>
    </Flex>
  )
}

export default Home;