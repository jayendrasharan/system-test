import React from 'react'
import { headerStyles } from './styles'

interface HeaderProps {
  styles?: object
}

const Header = (props: HeaderProps) => {
  return <div {...{...headerStyles, ...props.styles}}><h1>To Do List</h1></div>
}

export default Header