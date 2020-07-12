import React from 'react';
import './TodoForm.scss';
import priorities from '../../constants/formConfigurations';
const TodoForm = (props) => {

    const handleChanges = (e)=>{
            const { name, value } = e.target;
            props.data[name] = value;
    }
    return (
        <div className="form-wrapper">
            <div className="form">
                <div class="column">
                    <div className="form-item">
                        <div className="item-label">
                            Title
                        </div>
                        <div className="item-input">
                            <input maxlength="140" readOnly={props.readOnly} onChange={handleChanges} name="title" defaultValue={props.data.title}/>
                        </div>
                    </div>
                    <div className="form-item">
                        <div className="item-label">
                            Complete By
                        </div>
                        <div className="item-input">
                            <input  readOnly={props.readOnly}  type="datetime-local" onChange={handleChanges} name="dueDate" defaultValue={props.data.dueDate}/>
                        </div>
                    </div>
                    <div className="form-item">
                        <div className="item-label">
                            Priority
                        </div>
                        <div className="item-input">
                            <select  disabled={props.readOnly}   onChange={handleChanges} name="priority" defaultValue={props.data.priority}>
                                {priorities.map(eachPriorityObj =>(
                                    <option value={eachPriorityObj.value}>{eachPriorityObj.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div className="form-item">
                        <div className="item-label">
                            Description
                        </div>
                        <div className="item-input">
                            <textarea maxlength="500" readOnly={props.readOnly}  onChange={handleChanges} name="desc" defaultValue={props.data.desc}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoForm;