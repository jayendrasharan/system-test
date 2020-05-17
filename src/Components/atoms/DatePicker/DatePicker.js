import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateElement = props => {
  const { getDateSelected, initialDate, dateFormat } = props;
  const [startDate, setStartDate] = useState(initialDate);
  const handleDateChange = date => {
    setStartDate(date);
    getDateSelected(date);
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      dateFormat={dateFormat}
    />
  );
};

DateElement.propTypes = {
  initialDate: PropTypes.string.isRequired,
  getDateSelected: PropTypes.func.isRequired,
  dateFormat: PropTypes.string.isRequired,
};


export default DateElement;
