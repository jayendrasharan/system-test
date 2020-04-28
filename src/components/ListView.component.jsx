import React,{useState,useEffect} from 'react'

function  getRowsData(data,func,actionStatus){
    const keys = ["summary","priority","createdOn","dueDate","currentStatus"]
    
    return data.map((itr,index)=>{
    return <tr key={index}><Render keys={keys} row={itr} actionStatus={actionStatus} onClickAction={func}></Render></tr>
    })
 }
 
function ListView(props) {
    const [actionCompleteStatus, setstateActionCompleteStatus] = useState('')
    function onClickAction(e){
        console.log('eeee ',e.target.name)
        if(e.target.name == 'Mark as Complete'){
            setstateActionCompleteStatus('Completed')
        }
               
       }
    return (
        <div>
            <table>
           <tbody>
               <tr>
               <th>Summary</th>
               <th>Priority</th>
               <th>Created On</th>
               <th>Due Date</th>
               <th>Actions</th>
               </tr>
           {getRowsData(props.data,onClickAction,actionCompleteStatus)}
           </tbody>
       </table>
        </div>
    )
}

export default ListView
const Render = (props)=>{
    
    return (
        props.keys.map((itr,index)=>{
            if(itr === 'currentStatus'){
                return <td key={props.index}>{<SetActions actionStatus={props.actionStatus} onClickAction={props.onClickAction} currentStatus={props.row[itr]}/>}</td>
            }else
                return <td key={props.index}>{props.row[itr]}</td>
        })
    )
}


const SetActions =(props)=>{
    let status = props.currentStatus === "Completed"?"Completed":"Mark as Complete"; 
    return (
        <div>
       {props.currentStatus === 'Open' && <button name='edit' onClick={props.onClickAction}>Edit</button>}
        <button name={ props.actionStatus} onClick={props.onClickAction}>{ props.actionStatus}</button>
        <button name='delete' onClick={props.onClickAction}>Delete</button>
            
        </div>     
    )
  
}


