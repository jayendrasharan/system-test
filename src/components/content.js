import React from 'react';
import './style.css';

import MyTable from './table';
import Navigation from './navigation';

const Content = () => {
    return (
        <div className='main-content-container'>
            <h2>Your ToDO Tasks list</h2>
            <Navigation />
            <MyTable />
        </div>
    );
}

export default Content;