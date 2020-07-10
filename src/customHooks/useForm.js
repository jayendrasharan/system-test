import React, { useState } from "react";

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  function handleChange(e) {
    const value = getInputValue(e.target);

    setValues({
      ...values,
      [e.target.name]: value,
    });
  }

  function reset() {
    Object.keys(values).forEach((key) => {
      values[key] = "";
    });
    setValues({
      ...values,
    });
  }

  return {
    values,
    handleChange,
    setValues,
    reset,
  };
};

function getInputValue(target) {
  const { type } = target;
  let value;

  switch (type) {
    case "checkbox":
      value = target.checked;
      break;
    case "select":
      value = target.text;
      break;
    default:
      value = target.value;
  }

  return value;
}

export default useForm;
