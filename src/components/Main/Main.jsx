import React, { useState } from 'react';

import Header from './../Header/Header';
import Tabs from './../Tabs/Tabs';
import DataGrid from './../DataGrid/DataGrid';
import CutomModal from './../CustomModal/CustomModal'

import './Main.css';

const Main = () =>{
  const [open, setOpen] = useState(false);
  return (
    <div className='container my-5 pt-2 main'>
      <Header/>
      <Tabs/>
      <DataGrid/>
      <CutomModal type='new' title='Add New Todo'/>
    </div>
  );
}

export default Main;