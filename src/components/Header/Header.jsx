import React from 'react';

import './Header.css';

const Header = () =>{
  return (
    <div className='row mx-0 header'>
      <h2 className='col-sm-8 text-center'>Todo List CRUD Application</h2>
      <div className='col-sm-4'>
        <input type='text' className='p-1 w-75' placeholder='Enter text to search'/>
      </div>
    </div>
  );
}

export default Header;