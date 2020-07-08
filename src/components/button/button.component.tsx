import React from 'react'

import { buttonStyles } from './styles'

interface ButtonProps {
  id: string,
  name: string,
  styles?: object,
  selected: boolean,
  onClick (): void
}

// Renders Button
const Button = (props: ButtonProps) => {
  const { id, onClick, name, styles, selected } = props
  return <div key={id} onClick={onClick} {...{ ...buttonStyles(selected), ...styles}}>{name}</div>
}

export default Button