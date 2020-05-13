import './Tab.scss';
import React from 'react';
import Anchor from '../../../atoms/Anchor';

const Tab = ({
  children,
  className,
  tabId,
  index,
  isSelected,
  onClick,
  onKeyDown,
  tabAriaLabel,
  ...others
}) => (
  <li
    className={isSelected ? `selected-tab ${className}` : className}
    id={`tab_${index}_${tabId}`}
    onClick={e => onClick(e, index)}
    onKeyDown={e => onKeyDown(e)}
    {...others}
  >
    <Anchor
      to={`#${tabId}`}
      variation="tertiary"
      className="tertiary tab-link"
      aria-label={tabAriaLabel || 'tab-link'}
      aria-controls={tabId}
      aria-selected={isSelected}
      role="tab"
    >
      {children}
    </Anchor>
  </li>
);

Tab.defaultProps = {
  className: '',
  inheritedStyles: '',
};

export default Tab;
