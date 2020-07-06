import React, { useState } from 'react';
import Tab from './Tab';
import './styles.css'

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const onTabClick = (tab) => { setActiveTab(tab) };

  return (
    <div className="tabs">

      <div className="tabs-header">

        {children.map((child) => {
          const { label } = child.props;
          const isActiveTab = (activeTab === label);
          return (
            <Tab isActiveTab={isActiveTab} key={label} label={label} onClick={onTabClick}
            />
          );
        })}

      
      </div>

      <div>
        {children.map((child) => {
          if (child.props.label !== activeTab) return null;
          return child.props.children;
        })}
      </div>

    </div>
  );
}

export default Tabs;