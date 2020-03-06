import React from 'react';

const Select = ({ values, value, label, selectValue }) => {
  return (
    <span>
      <label htmlFor={label}>{label}</label>
      <select className="custom-select" value={value} onChange={selectValue}>
        <option value="">Choose...</option>
        {values.map(v => (
          <option value={v} key={v}>
            {v}
          </option>
        ))}
      </select>
    </span>
  );
};

export default Select;
