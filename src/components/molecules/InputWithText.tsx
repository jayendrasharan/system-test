import React from 'react';
import { Flex, Text, Input } from '../atoms';

interface InputWithTextProps {
  label: string;
  errors: string[];
  input: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  className?: string;
}

const InputWithText = ({
  label,
  errors,
  input: {
    name,
    value,
    onChange
  },
  className
}: InputWithTextProps) => {
  return (
    <Flex flexDirection='column' className={className} width='100%'>
      <Text mb={4} color='darkGrey'>{label}</Text>
      <Input
        height={6}
        name={name}
        value={value}
        onChange={onChange}
      />
      {
        errors.length > 0 ? 
        <Flex flexDirection='column'>{errors.map((error, i) => <Text color='red' fontSize={0} key={i}>{error}</Text>)}</Flex> : null
      }
    </Flex>
  )
}

export default InputWithText;