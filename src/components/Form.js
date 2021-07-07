import React from 'react';

import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';
import Select from './Select';
import '../styles/form.css';

const Form = props => {
  const { submit, formData, handleAddTodoModal, editMode } = props;
  const { titleData, descriptionData, dueDateData, priorityData } = formData;
  return (
    <form onSubmit={submit}>
      <h3>{editMode ? 'Edit' : 'Add'} a todo</h3>
      <Input
        label="title"
        type="text"
        value={titleData.value}
        setText={titleData.setText}
      />
      <Textarea
        label="description"
        value={descriptionData.value}
        setText={descriptionData.setText}
      />
      <Input
        label="due date"
        type="date"
        value={dueDateData.value}
        setText={dueDateData.setText}
      />
      <Select
        values={priorityData.values}
        value={priorityData.value}
        label="priority"
        selectValue={priorityData.selectValue}
      />
      <div className="buttons">
        <Button type="submit">Submit</Button>
        <Button click={handleAddTodoModal}>Close</Button>
      </div>
    </form>
  );
};

export default Form;
