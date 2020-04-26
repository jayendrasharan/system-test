import React from 'react'

export const  CancelSave = (props) =>   {
    return (
        <div className="myButtons">
            <input
                type="button"
                name="Cancel"
                value="Cancel"
                onClick={props.cancelProps}
                className="myCancel"
            />
            <input
                type="button"
                name="Save"
                value="Save"
                onClick={props.saveProps}
                className="mySave"
            />
        </div>
    )
}
