import React from 'react';

const Textarea = ({ label, value, setText }) => {
  return (
    <div className="mb-3">
      <label htmlFor={label} style={{ textTransform: 'capitalize' }}>
        {label}
      </label>
      <textarea
        className="form-control"
        value={value}
        onChange={e => setText(e.target.value)}
        placeholder={label}
      ></textarea>
    </div>
  );
};

export default Textarea;
