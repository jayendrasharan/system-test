/**
 *
 * Textarea
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  resize: PropTypes.string,
};

const Textarea = ({
  id,
  className,
  title,
  name,
  placeholder,
  value,
  resize,
  ...others
}) => (
  <textarea
    id={id}
    className={className}
    name={name}
    title={title}
    placeholder={placeholder}
    defaultValue={value}
    resize={resize}
    {...others}
  />
);

Textarea.defaultProps = {
  className: '',
  title: '',
  placeholder: '',
  value: '',
  resize: 'none',
};

Textarea.propTypes = propTypes;

export default Textarea;
