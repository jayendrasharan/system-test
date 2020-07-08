import React from 'react';
import DatePicker from 'react-date-picker';
const inputControls = (props) => {
    let inputElement = null;

    switch (props.inputType) {
        case "input":
            inputElement = <label>{props.labelName}
                <input type="text" name={props.fieldName} required value={props.fieldValue} onChange={props.fieldValueChange} />
            </label>
            break;
        case "textArea":
            inputElement = <label>{props.labelName}
                <textarea value={props.fieldValue} required name={props.fieldName} onChange={props.fieldValueChange} />
            </label>
            break;
        case "dropDown":
            let options = props.config.addTask.options.map((el,index) =>
                <option key={index} value={el}>{el}</option>
            );
            inputElement = <label>{props.labelName}
                <select value={props.fieldValue} required name={props.fieldName} onChange={props.fieldValueChange}>
                    {options}
                </select>
            </label>
            break;
        case "datePicker":
            inputElement = <label>{props.labelName}<DatePicker
                name={props.fieldName}
                required={true}
                onChange={props.fieldValueChange}
                value={props.fieldValue}
            /> </label>
            break;
        default:
            inputElement = <div />;
    }
    return inputElement;
}

export default inputControls;