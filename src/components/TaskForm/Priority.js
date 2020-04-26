import React, { Fragment } from 'react'

const listofPriorities = ["None","low","medium","high"];

export const ListOut = ({values}) => {
    return (values.map((val,ind) => (
        <option value={val} key={ind}>{val}</option>
    )));
}

export const Priority = ({name,onSelection,selectedvalue,value}) => (
        <div className="myPriority">
        <label htmlFor="mySelect" className="myFont">{name}</label>
        <select
             id="mySelect" 
             onChange={onSelection}
             value={selectedvalue || value}
             >
                <ListOut values={listofPriorities}/>
        </select>
        </div>

)
