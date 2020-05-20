import React from 'react'
import Tabs from './Tabs'
import VisibleTodoList from '../containers/VisibleTodoList'
import styled from 'styled-components'
import Header from '../containers/HeaderContainer'
import AddTodo from '../containers/AddTodo'

const Div = styled.div`
  background-color: #fff;
`
const App = () => (
  <div>
    <Header />
    <Tabs />
    <AddTodo/>
    <VisibleTodoList />
  </div>
)

export default App
