import React, { useState } from 'react';

//import Header from './Header';
//import Tabs from './Tabs';
//import DataGrid from './DataGrid/DataGrid';
//import CustomModal from './Modal';

import { TodoWrapper } from './Wrapper';
import Tabs from '../Tabs';
import Header from '../Header';

const Todo = () =>{
  const [open, setOpen] = useState(false);
  return (
    <TodoWrapper className='container my-5 pt-2'>
      <Header/>
      <Tabs/>   
    </TodoWrapper>
  );
}

export default Todo;