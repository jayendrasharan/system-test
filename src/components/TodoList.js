import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TodoViewDiv = styled.div`
  box-shadow: 0 2px 15px 0 rgba(0,0,0,0.1);
  background-color: #fff;
  color: #4a4a4a;
  border-radius: 5px;
  -webkit-transition: box-shadow 400ms;
  transition: box-shadow 400ms;
  width: 80%;
  margin-left: 8%;
  margin-top: 30px;
  margin-bottom: 30px;`

const ActionButton = styled.button`
    color: #898989;
    height: 36px;
    padding: 0;
    vertical-align: middle;
    background: none;
    border: none;
    border-radius: 50%;
    margin-left: 30px;
    transition: box-shadow 400ms,color 400ms;
    font-size: inherit;
    font-weight: inherit;
    text-align: left;
    line-height: 1;
    cursor: pointer;`

const strikeout = styled.tr`
 td:before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 0;
  border-bottom: 1px solid #111;
  width: 100%;
}`

const widthConfig = {
  "Summary": "20%",
  "title": "20%",
  "Priority": "10%",
  "priority": "10%",
  "Created On": "20%",
  "Due Date": "20%",
  "dueDate": "20%",
  "createdAt": "20%",
  "Actions": "30%",
}

const generateTableHeaders = () => {
  return ["Summary", "Priority", "Created On", "Due Date", "Actions"].map(col => {
    return <th key={col} style={{ width: widthConfig[col], textAlign: "left" }}>
      {col}
    </th>
  })
}

const generateActions = (todo, toggleOverlay, deleteTodo, markAsDone, markAsUnDone) => {
  return (
    <div>
      <ActionButton onClick={() => toggleOverlay(todo)}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512 512" height="15" viewBox="0 0 512 512" width="20"><g><path fill="#898989" d="m128.285 260.925h319.073v75h-319.073z" transform="matrix(.707 -.707 .707 .707 -126.717 290.929)" /><path fill="#898989" d="m29.021 422.521-29.021 89.479 89.481-29.02z" /><path fill="#898989" d="m54.039 186.679h319.073v75h-319.073z" transform="matrix(.707 -.707 .707 .707 -95.964 216.682)" /><path fill="#898989" d="m371.541 5.46h90v180h-90z" transform="matrix(.707 -.707 .707 .707 54.502 322.498)" /><path fill="#898989" d="m57.148 335.796-17.737 54.689 82.106 82.105 54.689-17.737z" /></g></svg>
      </ActionButton>
      {<ActionButton onClick={() => deleteTodo(todo.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="-40 0 427 427.00131" width="20"><path fill="#898989" d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" /><path fill="#898989" d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" /><path fill="#898989" d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" /><path fill="#898989" d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" /></svg>
      </ActionButton>}
      {todo.completed && <ActionButton onClick={() => markAsUnDone(todo.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 515.556 515.556" height="15" viewBox="0 0 515.556 515.556" width="20"><path  fill="#898989" d="m386.667 96.667h-225.556v64.444h225.556c35.542 0 64.444 28.902 64.444 64.444s-28.902 64.444-64.444 64.444h-290v-64.444l-96.667 96.667 96.667 96.667v-64.444h290c71.068 0 128.889-57.821 128.889-128.889s-57.821-128.889-128.889-128.889z"/></svg>
        </ActionButton>}
        {!todo.completed && <ActionButton onClick={() => markAsDone(todo.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -21 512.016 512" width="20"><path fill="#898989" d="m234.667969 469.339844c-129.386719 0-234.667969-105.277344-234.667969-234.664063s105.28125-234.6679685 234.667969-234.6679685c44.992187 0 88.765625 12.8203125 126.589843 37.0976565 7.425782 4.78125 9.601563 14.679687 4.820313 22.125-4.796875 7.445312-14.675781 9.597656-22.121094 4.820312-32.640625-20.972656-70.441406-32.042969-109.289062-32.042969-111.746094 0-202.667969 90.921876-202.667969 202.667969 0 111.742188 90.921875 202.664063 202.667969 202.664063 111.742187 0 202.664062-90.921875 202.664062-202.664063 0-6.679687-.320312-13.292969-.9375-19.796875-.851562-8.8125 5.589844-16.621094 14.378907-17.472656 8.832031-.8125 16.617187 5.589844 17.472656 14.378906.722656 7.53125 1.085937 15.167969 1.085937 22.890625 0 129.386719-105.277343 234.664063-234.664062 234.664063zm0 0"/><path fill="#898989" d="m261.332031 288.007812c-4.09375 0-8.191406-1.558593-11.304687-4.691406l-96-96c-6.25-6.253906-6.25-16.386718 0-22.636718s16.382812-6.25 22.632812 0l84.695313 84.695312 223.335937-223.339844c6.253906-6.25 16.386719-6.25 22.636719 0s6.25 16.382813 0 22.632813l-234.667969 234.667969c-3.136718 3.113281-7.230468 4.671874-11.328125 4.671874zm0 0"/></svg>
        </ActionButton>}
      {/* <ActionButton>
        <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 374.706 374.706" height="15" viewBox="0 0 374.706 374.706" width="20"><path fill="#898989" d="m321.176 53.529h-107.058v53.529h107.059v80.294l-214.111-.007 40.141-40.141-40.147-40.147-107.06 107.061 107.059 107.059 40.147-40.147-40.153-40.153 214.124-.02c29.522 0 53.529-24.007 53.529-53.529v-80.268c0-29.523-24.007-53.53-53.53-53.531z" /></svg>
      </ActionButton> */}
    </div>
  )
}

const generateTableRows = (todos, toggleOverlay, deleteTodo, markAsDone, markAsUnDone) => {
  return todos.map(todo => {
    return <tr>
      {
        ["title", "priority", "createdAt", "dueDate", "Actions"].map(e => {
          console.log(todo)
          return <td style={{ width: widthConfig[e], color: todo.completed ? "#669900" : "inherit" }}>
            {e === "createdAt" ? new Date(todo[e]).toDateString() : e === "dueDate" ? new Date(todo[e]).toDateString() : e === "Actions" ? generateActions(todo, toggleOverlay, deleteTodo, markAsDone, markAsUnDone) : todo[e]}
          </td>
        })
      }
    </tr>
  })
}

const TodoList = ({ todos, toggleTodo, toggleOverlay, deleteTodo, markAsDone, markAsUnDone }) => (
  <TodoViewDiv>
    <table style={{ width: "100%", padding: "8px" }}>
      <tr>
        {generateTableHeaders()}
      </tr>
      {generateTableRows(todos, toggleOverlay, deleteTodo, markAsDone, markAsUnDone)}
    </table>
  </TodoViewDiv>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired
}

export default TodoList
