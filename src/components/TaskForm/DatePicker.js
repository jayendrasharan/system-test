import React, { Fragment } from 'react'

export const  DatePicker = ({onSelection,selectedvalue,value}) => {
    return (
        <div className="myDatePicker" >
            <label htmlFor="myDate" >Due Date :</label>
                <input  
                    id="myDate"
                    type="date" 
                    name="DatePicker"
                    onClick={onSelection}
                    onBlur={onSelection}
                    value={value}
                />
        </div>
    )
}
