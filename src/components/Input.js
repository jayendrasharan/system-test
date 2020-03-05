import React from 'react';

const Input = ({ label, type, value, setText }) => {
  return (
    <div className="form-group">
      <label htmlFor={label} style={{ textTransform: 'capitalize' }}>
        {label}
      </label>
      <input
        className="form-control"
        type={type}
        name={label}
        value={value}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      ></input>
    </div>
  );
};

export default Input;
