import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  inheritedStyles: PropTypes.string,
  tabId: PropTypes.string,
};

const TabPanel = ({
  children,
  className,
  index,
  isSelected,
  tabId,
  ...others
}) => (
  <div
    id={tabId}
    className={className}
    role="tabpanel"
    aria-expanded={isSelected}
    aria-hidden={!isSelected}
    aria-labelledby={`tab_${index}_${tabId}`}
    hidden={!isSelected}
    {...others}
  >
    {children}
  </div>
);

TabPanel.propTypes = propTypes;

TabPanel.defaultProps = {
  className: '',
  inheritedStyles: '',
  index: 0,
  isSelected: false,
  tabId: '',
  children: '',
};

export default TabPanel;
