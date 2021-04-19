import React, { useState, useEffect, useCallback, Fragment } from 'react';

const Tabs = ({ tabs, updateActiveIndex, defaultIndex = 0 }) => {

    const [ activeIndex, setActiveIndex ] = useState(defaultIndex);
    
    return (<ul className="col-12 nav nav-tabs justify-content-around">
        {
            tabs.map((tab, index) => {
                let activeClass = index === activeIndex ? 'active' : '';
                return (<li className="nav-item col-4 p-0" key={tab.name} onClick={
                    () => {
                        if(updateActiveIndex){
                            updateActiveIndex(index);
                        }
                        setActiveIndex(index)
                    }
                  }>
                 <a className={`nav-link text-center ${activeClass}`} href="#">{tab.name}</a>
                </li>)
            })
        }
    </ul>)
}

export default Tabs;