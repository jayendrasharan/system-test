export const actionTypes = {
     INDEX_ADD_TODOS_SUCCESS : 'INDEX_ADD_TODOS_SUCCESS',
    
     INDEX_EDIT_TODOS_SUCCESS : 'INDEX_EDIT_TODOS_SUCCESS',

     INDEX_DELETE_TODOS_SUCCESS : 'INDEX_DELETE_TODOS_SUCCESS',

     INDEX_GROUP_DELETE_SUCCESS : 'INDEX_GROUP_DELETE_SUCCESS ',

}


export const addTodo = (todo) => dispatch => {

    return new Promise((resolve, reject) => {
            setTimeout(() => {
            dispatch({type: actionTypes.INDEX_ADD_TODOS_SUCCESS , payload:todo})
            resolve('success')
            },2000)
    })
     
}

export const editTodo = (todo) => dispatch => {
     return new Promise((resolve,reject) => {
        setTimeout(() => {
              dispatch({type: actionTypes.INDEX_EDIT_TODOS_SUCCESS , payload:todo})
              resolve('success')

              },2000)
     })
   
}

export const deelteTodo = (data) => dispatch => {
   return new Promise((resolve ,reject) => {
       
    setTimeout(() => {
          dispatch({type: actionTypes.INDEX_DELETE_TODOS_SUCCESS , payload:data})
          resolve('success')
          },2000)
   })
  
}

export const onGroupDeleteTodo = (data) => dispatch => {
     return new Promise((resolve ,reject) => {
         
      setTimeout(() => {
            dispatch({type: actionTypes.INDEX_GROUP_DELETE_SUCCESS , payload:data})
            resolve('success')
            },2000)
     })
    
  }