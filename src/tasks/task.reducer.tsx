import { seeds } from '../static/seed'

import { CLEAR_TASK, DELETE_TASK, FEED_TASKS, FILTER_TASKS, LOADING, SAVE_TASK, SORT_BY_CUSTOM, SORT_BY_DEFAULT, VIEW_OR_EDIT_TASK } from './task.constants';

const INITIAL_STATE = {
    rawData: {},
    data: {},
    currentTask: {},
    mode: '',
    loading: false,
    status: 'all',
    sortBy: ''
}

export const ACTION_HANDLERS = {
    [DELETE_TASK]: (state: any, action: any) => {
        state.rawData.body = state.rawData.body.filter((bodyObj: any) => bodyObj.id !== action.id)
        state.data.body = state.data.body.filter((bodyObj: any) => bodyObj.id !== action.id)
        return {
            ...state
        }
    },

    [CLEAR_TASK]: (state: any) => {
        return { 
            ...state, 
            currentTask: {},
            mode: ''
        }
    },

    [FEED_TASKS]: (state: any) => {
        const tasks: any = { headers: seeds.headers, body: seeds.body.sort((a: any, b: any) => (a.currentState > b.currentState) ? 1 : ((b.currentState > a.currentState) ? -1 : 0)) }
        return { ...state, rawData: tasks, data: tasks }
    },

    [FILTER_TASKS]: (state: any, action: any) => {
        const { status } = action
        const tasks = { ...state.rawData }
        // tslint:disable-next-line:prefer-conditional-expression
        if (status && (status === 'pending' || status === 'completed')) {
            tasks.body = state.rawData.body.filter((seedBody: any) => status === 'pending' ? !!seedBody.currentState : !seedBody.currentState)
        } else {
            tasks.body = state.rawData.body.sort((a: any, b: any) => (a.currentState > b.currentState) ? 1 : ((b.currentState > a.currentState) ? -1 : 0))
        }
        return { ...state, data: tasks, status, loading: false }
    },

    [LOADING]: (state: any) => {
      return { 
          ...state,
          loading: true
      }
    },

    [SAVE_TASK]: (state: any, action: any) => {
        if (action.task.id === -1) {
            const sortedRaw = state.rawData.body.sort((a: any, b: any) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
            const task = action.task
            task.id = state.rawData.body.length !== 0 ? sortedRaw[state.rawData.body.length - 1].id + 1 : 1
            task.currentState = 'open'
            task.createdAt = new Date()
            state.rawData.body.unshift(task)
        } else {
            state.rawData.body = state.rawData.body.map((bodyObject: any) => bodyObject.id === action.task.id ? action.task : bodyObject)
        }
        state.data.body = state.rawData.body
        return { 
            ...state, 
            currentTask: {},
            mode: ''
        }
    },

    [SORT_BY_DEFAULT]: (state: any, action: any) => {
        const sortedBody = !state.sortBy || (state.sortBy && state.sortBy.indexOf(action.id) !== -1 && state.sortBy.indexOf('dsc') !== -1) ?
            state.data.body.sort((a: any, b: any) => (a[`${action.id}`] > b[`${action.id}`]) ? 1 : ((b[`${action.id}`] > a[`${action.id}`]) ? -1 : 0)) : 
            state.data.body.sort((a: any, b: any) => (a[`${action.id}`] > b[`${action.id}`]) ? -1 : ((b[`${action.id}`] > a[`${action.id}`]) ? 1 : 0))
        return {
            ...state, 
            data: { 
                headers: state.data.headers, 
                body: sortedBody
            },
            sortBy: state.sortBy && state.sortBy.indexOf('asc') !== -1 ? `${action.id}-dsc` : `${action.id}-asc`
        }
    },

    [SORT_BY_CUSTOM]: (state: any, action: any) => {
        const { id, customSort } = action
        let sortedBody = []
        if (customSort) {
            sortedBody = !state.sortBy || (state.sortBy && state.sortBy.indexOf(action.id) !== -1 && state.sortBy.indexOf('dsc') !== -1) ?
                state.data.body.sort((a: any, b: any) => 
                    (customSort[`${a[`${id}`]}`] > customSort[`${b[`${id}`]}`]) ? 
                    1 : 
                    ((customSort[`${b[`${id}`]}`] > customSort[`${a[`${id}`]}`]) ? 
                    -1 : 
                    0
                )) : 
                state.data.body.sort((a: any, b: any) => 
                    (customSort[`${a[`${id}`]}`] > customSort[`${b[`${id}`]}`]) ? 
                    1 : 
                    ((customSort[`${b[`${id}`]}`] > customSort[`${a[`${id}`]}`]) ? 
                    -1 : 
                    0
                )).reverse()
        } else {
            sortedBody = !state.sortBy || (state.sortBy && state.sortBy.indexOf(action.id) !== -1 && state.sortBy.indexOf('dsc') !== -1) ?
                state.data.body.sort((a: any, b: any) => (a[`${id}`] > b[`${id}`]) ? 1 : ((b[`${id}`] > a[`${id}`]) ? -1 : 0)) : 
                state.data.body.sort((a: any, b: any) => (a[`${id}`] > b[`${id}`]) ? 1 : ((b[`${id}`] > a[`${id}`]) ? -1 : 0)).reverse()
        }
        
        return { 
            ...state, 
            data: { 
                headers: state.data.headers, 
                body: sortedBody
            },
            sortBy: state.sortBy && state.sortBy.indexOf('asc') !== -1 ? `${action.id}-dsc` : `${action.id}-asc`
        }
    },

    [VIEW_OR_EDIT_TASK]: (state: any, action: any) => {
        const task = state.rawData.body.find((taskObject: any) => taskObject.id === action.id)
        return { 
            ...state,
            currentTask: task,
            mode: action.mode,
            loading: false
        }
    },

}

export default function AppReducer(state: any = INITIAL_STATE, action: any) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
