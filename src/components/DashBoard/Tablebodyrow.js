import React,{Fragment} from 'react'
import {Actionbuttons} from './Actionbuttons';
export const Tabledatarow = ({rowElement,rowkeys,tableAction,rowInd,disableButtons}) => {

    let newRowElement = {...rowElement,
        node:<Actionbuttons 
                action={tableAction} 
                rowElement={rowElement}
                disableButtons={disableButtons}
            />
        };
     
    console.log(newRowElement,"FFF");
    return (
        <tr> 
        {rowkeys.map(
            (rowVal,ind) => (
                <td key={ind}>{newRowElement[`${rowVal}`]}</td>
            )
        )}
        </tr>
    )
}