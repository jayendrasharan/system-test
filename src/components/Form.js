import React from 'react';

import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';
import Select from './Select';

const Form = props => {
  const { submit, formData } = props;
  const { titleData, descriptionData, dueDateData, priorityData } = formData;
  return (
    <form onSubmit={submit}>
      <h3>Add a todo</h3>
      <Input
        label={titleData.label}
        type={titleData.type}
        value={titleData.value}
        setText={titleData.setText}
      />
      <Textarea
        label={descriptionData.label}
        value={descriptionData.value}
        setText={descriptionData.setText}
      />
      <Input
        label={dueDateData.label}
        type={dueDateData.type}
        value={dueDateData.value}
        setText={dueDateData.setText}
      />

      <Select
        values={priorityData.values}
        value={priorityData.value}
        label={priorityData.label}
        selectValue={priorityData.selectValue}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
