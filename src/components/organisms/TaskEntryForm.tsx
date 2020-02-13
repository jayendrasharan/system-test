import React, { useState } from 'react';
import { Flex, Text, Input, Button } from '../atoms';
import { InputWithText, Dropdown } from '../molecules'
import { TaskEntryFormProps } from '../../react-app-env';
import { useFormInputs } from '../../custom-hooks';
import { inputPrioritySelectionOptions } from '../../actions/todo';

const TaskEntryForm = ({
  selectedTask, onFormSubmit,
  onCloseModal
}: TaskEntryFormProps) => {
  const { values, onChange, errors, hasErrors } = useFormInputs(selectedTask, {
    title: {
      minLength: 10,
      maxLength: 140,
      value: selectedTask.title
    },
    description: {
      minLength: 10,
      maxLength: 500,
      value: selectedTask.description
    }
  })
  const [selectedPriority, updatePriority] = useState<any>(selectedTask.priority)
  const [dueDate, updateDueDate] = useState(selectedTask.dueDate)
  const editingTask = selectedTask.id !== -1

  const onDateChange = (event: React.FormEvent<HTMLInputElement>) => {
    updateDueDate(event.currentTarget.value)
  }

  const onClickSubmit = () => {
    onFormSubmit({
      description: values.description,
      title: values.title,
      dueDate,
      priority: selectedPriority,
      id: selectedTask.id
    })
  }

  return (
    <Flex flexDirection='column' width={12}>
      <Text as='h3' px={6}>{editingTask ? 'Edit Task' : 'Add Task'}</Text>
      <Flex as='form' px={6} width='100%' flexDirection='column' onSubmit={(e: React.FormEvent) => e.preventDefault()}>
        <InputWithText
          label='Summary'
          errors={errors.title}
          input={{
            name: 'title',
            value: values.title,
            onChange: onChange
          }}
        />
        <Flex flexDirection='column' my={4}>
          <Text mb={4} color='darkGrey'>Description</Text>
          <Input value={values.description} onChange={onChange} name='description' as='textarea'/>
          {errors.description.length > 0 ? errors.description.map((d: string, index: number) => <Text color='red' fontSize={0} key={index}>{d}</Text>) : null}
        </Flex>
        <Flex justifyContent='space-between' my={4} alignItems='center'>
          <Flex>
            <Text color='darkGrey'>Priority</Text>
            <Dropdown
              options={inputPrioritySelectionOptions}
              selected={selectedPriority}
              onSelect={updatePriority}
            />
          </Flex>
          <Flex alignItems='center'>
            <Text color='darkGrey' mr={4}>Due Date: </Text>
            <Input value='' onChange={onDateChange} name='dueDate' type='date'/>
          </Flex>
        </Flex>
        <Flex my={4} width='100%' alignItems='center' justifyContent='flex-end'>
          <Button  disabled={hasErrors} variant='primary' px={7} mr={4} height={6} onClick={onClickSubmit}>{editingTask ? 'Edit' : 'Save'}</Button>
          <Button variant='secondary' px={7} ml={4} height={6} onClick={onCloseModal}>Cancel</Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TaskEntryForm;