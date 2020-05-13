import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import '../../../../styles/components/src/atoms/_select.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.string || PropTypes.bool,
  options: PropTypes.any.isRequired,
  selectedOption: PropTypes.string,
  placeholder: PropTypes.node,
};

const Select = ({
  id,
  className,
  disabled,
  placeholder,
  options,
  selectedOption,
  name,
  ...others
}) => (
  <React.Fragment>
    <select
      id={id}
      name={name}
      className={classnames(className)}
      value={selectedOption}
      disabled={disabled}
      {...others}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        <option key={opt.label} value={opt.value} data-attr={opt.dataAttribute}>
          {opt.label}
        </option>
      ))}
    </select>
  </React.Fragment>
);

Select.defaultProps = {
  disabled: false,
  selectedOption: '',
  placeholder: '',
  className: '',
  showArrow: false,
};

Select.propTypes = propTypes;

export default Select;
