import React from 'react'
import Footer from './Footer'
import VisibleTodoList from '../containers/VisibleTodoList'
import AddTodoButton from '../containers/AddTodoButton'

const App = () => (
  <div className="container justify-content-center">
    <Footer />
    <VisibleTodoList /> 
    <AddTodoButton /> 
  </div>
)

export default App