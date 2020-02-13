import React, { useRef, useEffect } from 'react';
import { Flex, Text, Button, Input } from '../atoms';
import { Dropdown, Tabbar } from '../molecules';
import { Table, ModalForm, TaskEntryForm } from '../organisms';
import { DropdownProps, TaskType } from '../../react-app-env';
import { initialTaskObj } from '../../actions/todo'

interface HomeProps {
  groupBy: DropdownProps;
  tabbar: DropdownProps;
  onClickAddTask: () => void;
  selectedTask: TaskType;
  openModal: boolean;
  onCloseModal: () => void;
  onFormSubmit: () => void;
  onSearchInputChange: () => void;
  searchTerm: string;
}

const Home = ({
  groupBy, tabbar, onFormSubmit,
  onClickAddTask, onCloseModal, searchTerm,
  openModal, selectedTask, onSearchInputChange
}: HomeProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const requiredKeys: string[] = ['Meta', 'Shift', 'f']
    let focusedKeys: string[] = [];
    const focusKeydown = (event: KeyboardEvent) => {
      if(requiredKeys.indexOf(event.key) !== -1) {
        focusedKeys.push(event.key)
        if(requiredKeys.every(key => focusedKeys.indexOf(key) !== -1) && inputRef.current) {
          inputRef.current.focus && inputRef.current.focus()
        }
      }
    }
    const focusKeyup = (event: KeyboardEvent) => {
      if(requiredKeys.indexOf(event.key) !== -1) {
        focusedKeys = focusedKeys.filter(key => key !== event.key)
      }
    }
    window.addEventListener('keydown', focusKeydown)
    window.addEventListener('keyup', focusKeyup)
    return () => {
      window.addEventListener('keydown', focusKeydown)
      window.removeEventListener('keyup', focusKeyup)
    }
  }, [inputRef])
  return (
    <Flex flexDirection='column' width='100%'>
      <Flex mb={6} flexDirection='column'>
        <Flex justifyContent='space-between' alignItems='flex-end'>
          <Text fontWeight='bold' as='h6' mb={2} pb={0}>Search Here</Text>
          <Text fontSize={0} color='darkGrey' pb={0} as='p' mb={2}>or Click (CTRL + SHIFT + F)</Text>
        </Flex>
        <Input
          ref={inputRef}
          height={7}
          value={searchTerm}
          name='searchTerm'
          onChange={onSearchInputChange}
        />
      </Flex>
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
        <TaskEntryForm selectedTask={{...initialTaskObj, ...selectedTask}} onCloseModal={onCloseModal} onFormSubmit={onFormSubmit}/>
      </ModalForm>
    </Flex>
  )
}

export default Home;