import React from 'react'
import {uniqId} from '../../constants/'
const buttonsList = ["Edit","Delete","Done"];

export const Actionbuttons = ({action,rowElement,disableButtons}) =>  
     {
         const buttonAction = (e,val,rowElement) => {
             console.log(val);
             action(e,val,rowElement);
         };
         return ((
            <div className="">
            {buttonsList.map((val,ind) => (
                <button 
                         id={`my${val}`}
                         className={`my${val}`}
                         onClick={e => {e.preventDefault(); e.stopPropagation(); buttonAction(e,val,rowElement);}}
                         disabled={disableButtons}              
                />
            ))}
            </div>
            ))
     };