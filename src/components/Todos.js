import React from 'react';
import moment from 'moment';

import Button from './Button';

const Todos = ({
  todos,
  todoCompletion,
  remove,
  edit,
  search,
  searchBy,
  groupBy
}) => {
  const tableHeadings = (
    <li className="list-group-item">
      <span style={{ display: 'inline' }}>
        <span>Status</span>
        <span> | </span>
        <span>Title</span>
      </span>
      <p>Description</p>
      <p>Created At</p>
      <p>Due Date</p>
      <p>Priority</p>
      <p>Actions</p>
    </li>
  );

  if (!Array.isArray(todos)) {
    return (
      <>
        {Object.keys(todos).map(i => {
          let heading = i;
          if (groupBy === 'createdAt')
            heading = moment(Number(i)).format('Do MMM Y, H:m');
          else if (groupBy === 'dueDate')
            heading = moment(Number(i)).format('Do MMM Y');
          return (
            <div key={i}>
              <h5>{heading}</h5>
              <ul>
                {tableHeadings}
                {todos[i].map(todo => {
                  return (
                    <li key={todo.id} className="list-group-item">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={todo.checked}
                          onChange={e => todoCompletion(e, todo.id)}
                        />
                        <label className="form-check-label">{todo.title}</label>
                      </div>
                      <p>{todo.description}</p>
                      <p>{moment(todo.createdAt).format('Do MMM Y, H:m')}</p>
                      <p>{moment(todo.dueDate).format('Do MMM Y')}</p>
                      <p>{todo.priority.value}</p>
                      <Button click={() => remove(todo.id)}>Remove</Button>
                      <Button click={() => edit(todo.id)}>Edit</Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </>
    );
  }
  return (
    <>
      <h3>Todos</h3>
      <ul className="list-group">
        {tableHeadings}
        {todos.map(todo => (
          <li key={todo.id} className="list-group-item">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={todo.checked}
                onChange={e => todoCompletion(e, todo.id)}
              />
              {searchBy === 'title' ? (
                todo.title
                  .split('')
                  .map(c =>
                    search.includes(c) ? <mark>{c}</mark> : <label>{c}</label>
                  )
              ) : (
                <label className="form-check-label">{todo.title}</label>
              )}
            </div>
            {searchBy === 'description' && search.length ? (
              <div style={{ display: 'inline' }}>
                {todo.description
                  .split('')
                  .map(c =>
                    search.includes(c) ? <mark>{c}</mark> : <label>{c}</label>
                  )}
              </div>
            ) : (
              <p>{todo.description}</p>
            )}
            <p>{moment(todo.createdAt).format('Do MMM Y, H:m')}</p>
            <p>
              {todo.dueDate.length
                ? moment(todo.dueDate).format('Do MMM Y')
                : ''}
            </p>
            <p>{todo.priority.value}</p>
            <Button click={() => remove(todo.id)}>Remove</Button>
            <Button click={() => edit(todo.id)}>Edit</Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
