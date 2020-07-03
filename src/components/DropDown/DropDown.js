import React from 'react'

export default function DropDown({value ,onChange}) {
    return (
        <div className="form-control-1">
        <select value={value} name="priority" onChange={onChange} id="priority">
          <option value="">Group By</option>
          <option value="createdAt">CreatedAt</option>
          <option value="dueDate">DueDate</option>
          <option value="priority">priority</option>
        </select>
      </div>
    )
}
