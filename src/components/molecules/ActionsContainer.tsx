import React from 'react';
import { Flex, Text, Input } from '../atoms';


interface ActionsContainerProps {
  label: string;
  errors: string[];
  input: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
}

const InputWithText = ({
  label,
  errors,
  input: {
    name,
    value,
    onChange
  }
}: ActionsContainerProps) => {
  return (
    <Flex flexDirection='column'>
      <Text>{label}</Text>
      <Input
        name={name}
        value={value}
        onChange={onChange}
      />
      {
        errors.length > 0 ? 
        <Flex flexDirection='column'>{errors.map((error, i) => <Text key={i}>{error}</Text>)}</Flex> : null
      }
    </Flex>
  )
}

export default InputWithText;