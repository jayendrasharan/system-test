import React , {useState , useEffect}from 'react'

export default function TabContent({header, data = [] , onClick ,statusFilter,onSort , groupBy = false , onGroupDelete }) {
  const [state ,setState] = useState([])
  // console.log(statusFilter)
  useEffect(() => {
    setState([])
    }, [data,statusFilter])


  if(data.length == 0){{
    return <h3>No TODO's found</h3>
  }}
  const onDelete = () => {
    onGroupDelete(state)
  }
  const onChangeCheckbox = (event,x) => {
    if(event.target.checked){
        setState([...state,x.createdAt])
    }else{
      const state1 = state.filter(xx => xx !=  x.createdAt)
      setState([...state1])
    }
  }
  const groupByCategory = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }),
    {}
  );
  const groupByMap = groupByCategory(groupBy);
  const data1 = groupByMap(data);
    return (
      <>
        {state && state.length >1 && <button onClick={onDelete} className="btn btn-danger">DELETE ALL</button>}
        <table className="table">
        <thead>
          <tr>
            <th>#</th>
    {header.map( x => <th key={x.label} onClick={() => onSort(x)} scope="col">{x.label}</th>)}
           
          </tr>
        </thead>
        <tbody>
           {!groupBy && data.length > 0 && data.map(x => {
               return (
                <tr key={x.createdAt} style={{textDecoration: (x.currentState == 'done' && statusFilter == 'all') ? 'line-through' :'initial'}}>
                  <th><input checked={state.indexOf(x.createdAt) != -1} onClick={(event) => onChangeCheckbox(event,x)} type="checkbox"/></th>
                <th onClick={() => onClick(x, 'view')} scope="row">{x.title}</th>
                <td onClick={() => onClick(x, 'view')}>{x.priority}</td>
               <td onClick={() => onClick(x, 'view')}>{new Date(x.createdAt).toLocaleString()}</td>
               <td onClick={() => onClick(x, 'view')}>{new Date(x.dueDate).toLocaleString()}</td>
               <td><span onClick={() => onClick(x, 'edit')}>EDIT</span> | <span  onClick={() => onClick(x, 'delete')}>DELETE</span> |
               <button className="btn" onClick={() => onClick(x, 'status')}>{x.currentState == 'open' ? 'DONE' : 'RE OPEN'}</button>
                </td> 
              </tr>
               )
           })}
           {
             groupBy && ( Object.keys(data1) && Object.keys(data1).length > 0 && Object.keys(data1).map(key => {
              return (
                <>
              <h3>{groupBy == 'priority' ? key :new Date(key).toLocaleString()}</h3>
              {
                data1[key].map(x => {
                  return (
                    
                    <tr key={x.createdAt} style={{textDecoration: (x.currentState == 'done' && statusFilter == 'all') ? 'line-through' :'initial'}}>
                                        <th><input onChange={(event) => onClick(event,x)} type="checkbox"/></th>

                    <th onClick={() => onClick(x, 'view')} scope="row">{x.title}</th>
                    <td onClick={() => onClick(x, 'view')}>{x.priority}</td>
                   <td onClick={() => onClick(x, 'view')}>{new Date(x.createdAt).toLocaleString()}</td>
                   <td onClick={() => onClick(x, 'view')}>{new Date(x.dueDate).toLocaleString()}</td>
                   <td><span onClick={() => onClick(x, 'edit')}>EDIT</span> | <span  onClick={() => onClick(x, 'delete')}>DELETE</span> |
                   <button className="btn" onClick={() => onClick(x, 'status')}>{x.currentState == 'open' ? 'DONE' : 'RE OPEN'}</button>
                    </td> 
                  </tr>
                   )
                })
              }
             </>
              )
             })
               
             )
           }

        </tbody>
      </table>

    
      </>

    )
}
