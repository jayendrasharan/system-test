import React from 'react';
import PropTypes from 'prop-types';
import '../../../../styles/components/src/atoms/_input.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
};

const Input = React.forwardRef(
  (
    {
      id,
      className,
      type,
      name,
      value,
      placeholder,
      ariaLabel,
      ariadescribedby,
      ariaInvalid,
      ...others
    },
    ref
  ) => (
    <input
      id={id}
      aria-label={ariaLabel}
      className={className}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      aria-describedby={ariadescribedby}
      aria-invalid={ariaInvalid}
      ref={ref}
      {...others}
    />
  )
);

Input.defaultProps = {
  placeholder: '',
  ariaLabel: '',
  className: '',
  type: 'text',
  value: '',
};

Input.propTypes = propTypes;

export default Input;
