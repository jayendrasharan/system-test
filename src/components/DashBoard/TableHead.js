import React from 'react';

export const TableHead = ({data,sortAction,disableButtons,isGroupBy,isSearch}) => {
    console.log(data,"Header");
    return (
        <thead>
            <tr>
                { 
                data.map((val,ind) => (
                <th key={ind}
                    onClick={(e) => sortAction(e,data[ind])}
                    disableButtons={disableButtons}
                    className={`${isGroupBy ||  isSearch ? "hideAll" : `my${val}` }`}
                >
                <span><a className={`my${val}`}>{val}</a></span>
                </th>)
                )
                }
            </tr>
        </thead>
       
    )
}