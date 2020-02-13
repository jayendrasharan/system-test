import React from 'react';
import { Flex, Text, Button } from '../atoms';
import { Dropdown, Tabbar } from '../molecules';
import { Table, ModalForm, TaskEntryForm } from '../organisms';
import { DropdownProps, TaskType } from '../../react-app-env';

interface HomeProps {
  groupBy: DropdownProps;
  tabbar: DropdownProps;
  onClickAddTask: () => void;
  selectedTask: TaskType;
  openModal: boolean;
  onCloseModal: () => void;
}

const Home = ({
  groupBy, tabbar,
  onClickAddTask, onCloseModal,
  openModal, selectedTask
}: HomeProps) => {
  return (
    <Flex flexDirection='column' width='100%'>
      <Button cursor='pointer' onClick={onClickAddTask} alignItems='center' width={10} height={7}>
        <Text fontWeight='bold'>Add Task</Text>
        <Text ml={6} fontSize={5} fontWeight='bolder'>+</Text>
      </Button>
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
      <ModalForm open={openModal} onCloseModal={onCloseModal}>
        <TaskEntryForm selectedTask={selectedTask} onCloseModal={onCloseModal}/>
      </ModalForm>
    </Flex>
  )
}

export default Home;