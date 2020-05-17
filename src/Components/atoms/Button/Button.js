import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
import classnames from 'classnames';
import './Button.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  inheritedStyles: PropTypes.string,
  type: PropTypes.string,
  variation: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'icon-only',
    '',
  ]),
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

const Button = ({
  className,
  children,
  inheritedStyles,
  type,
  variation,
  disabled,
  ariaLabel,
  ...others
}) => (
  <button
    aria-label={ariaLabel || null}
    className={classnames('cursor',variation, className)}
    disabled={disabled}
    aria-disabled={disabled} 
    type={type}
    {...others}
  >
    {children}
  </button>
);

Button.defaultProps = {
  inheritedStyles: '',
  type: 'button',
  disabled: false,
  ariaLabel: '',
  className: 'cta',
  variation: '',
};

Button.propTypes = propTypes;

export default Button;
