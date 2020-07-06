import React from 'react';

const Tab = ({ isActiveTab, label, onClick }) => {
  const handleHeaderClick = () => onClick(label);
  return (
    <span className={isActiveTab ? 'tabs-header-active' : 'tabs-header-item'} onClick={handleHeaderClick}>
      {label}
    </span>
  );
}

export default Tab;