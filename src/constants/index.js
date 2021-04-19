import React from 'react';

const dateSort = (data, sortBy, key) => {
    return data.sort((a,b)=>{
        let value1 = new Date(a[key]),
        value2 = new Date(b[key])
        if(sortBy==='ASC') {
            return value1-value2;
        } else {
            return value2-value1;
        }   
    })
}

export const columns = [
    {
        name: 'Summary',
        apiKey: 'title',
        allowSort: true,
        allowSearch: true,
        allowGroupBy: false,
        isHidden: false,
    },
    {        
        name: 'CurrentState',
        apiKey: 'currentState',
        allowSort: true,
        allowSearch: false,
        allowGroupBy: false,
        isHidden: true,
    },
    {   
        name: 'Description',
        apiKey: 'description',
        allowSort: false,
        allowSearch: true,
        allowGroupBy: false,
        isHidden: true,
    },
    {
        name: 'Created at',
        apiKey: 'createdAt',
        allowSort: true,
        allowSearch: false,
        allowGroupBy: true,
        isHidden: false,
        sortFn: (data, sortBy) => dateSort(data, sortBy, 'createdAt')
    },
    {
        name: 'Due date',
        apiKey: 'dueDate',
        allowSort: true,
        allowSearch: false,
        allowGroupBy: true,
        isHidden: false,
        sortFn: (data, sortBy) => dateSort(data, sortBy, 'dueDate')
    },
    {
        name: 'Priority',
        apiKey: 'priority',
        allowSort: true,
        allowSearch: false,
        allowGroupBy: true,
        isHidden: false,
    }
];

export const actions = [
    {
        type: 'EDIT'
    },
    {
        type: 'DELETE'
    },
    {
        type: 'STATUS'
    }
];

export const priorities = ['None', 'Low', 'Medium', 'High'];

export const groups= [
    { name: 'None', value: ''}, 
    { name: 'Created On', value: 'createdAt'}, 
    { name: 'Pending On', value: 'dueDate'}, 
    { name: 'Priority', value: 'priority'}
];