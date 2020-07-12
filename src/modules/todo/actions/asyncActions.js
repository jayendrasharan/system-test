const asyncOperationStart = ()=>({
    type: 'ASYNC_IN_PROGRESS'
})

const asyncOperationCompleted = ()=>({
    type: 'ASYNC_COMPLETED'
})

export const asyncWrapper = (dispatch, action)=>{
        dispatch(asyncOperationStart());
        return setTimeout(() => {
            action();
            dispatch(asyncOperationCompleted());
        }, 1000)
}
