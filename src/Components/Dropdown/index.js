import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const Dropdown = props => {

    const { data, valueColumn, displayColumn, handleChange, isDisabled, selectedValue, displayLabel } = props;

    return (
        <FormControl>
            <InputLabel id="todoform-dropdown-select-label">{displayLabel}</InputLabel>
            <Select
                labelId="todoform-dropdown-select-label"
                id="todoform-dropdown-select"
                value={selectedValue}
                disabled={isDisabled}
                onChange={handleChange}
            >
                {
                    data.map((item, i) => (
                        <MenuItem key={`${valueColumn}-item-data-${i}`} value={item[valueColumn]}>
                            {item[displayColumn]}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
};

export default Dropdown;