import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  ListType: PropTypes.oneOf(['ul', 'ol']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  nested: PropTypes.bool,
  inline: PropTypes.bool,
  noDefaultView: PropTypes.bool,
  borderSeparator: PropTypes.bool,
  noMargin: PropTypes.bool,
  inheritedStyles: PropTypes.string,
};

const List = ({ className, ListType, children, ...others }) => (
  <ListType className={className} {...others}>
    {children}
  </ListType>
);

List.propTypes = propTypes;

List.defaultProps = {
  inheritedStyles: '',
  ListType: 'ul',
  className: '',
  borderSeparator: false,
  noDefaultView: false,
  inline: false,
  nested: false,
  noMargin: false,
};

export default List;
