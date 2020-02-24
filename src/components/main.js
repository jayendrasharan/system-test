import React from 'react';

import Content from './content';
import Aside from './aside';
import PopupModal from './Popupmodal'

import './style.css';

const Main = () => {
    return (
        <div>
            <Content />
            <Aside />
            <PopupModal />
        </div>
    );
}

export default Main;