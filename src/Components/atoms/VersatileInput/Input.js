import React from 'react';
import classnames from 'classnames';
import './Input.scss';

const input = props => {
  let inputElement = null;
  const inputClasses = classnames(
    'input-element',
    props.classList,
    `${
      props.invalid && props.shouldValidate && props.touched ? 'invalid' : ''
    }`,
  );
console.log(props.elementType,props,'disabled check');
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          disabled={props.disabled}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          disabled={props.disabled}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
          disabled={props.disabled}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case 'checkbox':
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          disabled={props.disabled}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="input-conatiner">
      <label className="label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
