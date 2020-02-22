import React from 'react'

import { Actions, Data } from '../../helpers/models'
import { tableStyles } from './styles'

interface TableProps {
  data: Data
  actions: Actions[]
  onSortChange (id: string): void
}

class Table extends React.Component<TableProps> {

  formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  displayHead = () => {
    const { data, onSortChange } = this.props
    return [...data.headers].map((headObject: any) => (
    <th onClick={() => headObject.sortable ? onSortChange(headObject.id) : ''} key={headObject.id}>{headObject.name} {headObject.sortable ? <i className='fa fa-sort' aria-hidden='true' /> : ''}</th>
    ))
  }

  displayData = () => {
    const { data, actions } = this.props

    return [...data.body].map((dataObject: any) => (
      <tr key={dataObject.id}>
        {data.headers.map((headObject: any) => {
          let td = <td key={'no-data'}>No Data</td>
          if (headObject.id === 'createdAt' || headObject.id === 'dueDate') {
          td = <td key={`${headObject.id}-${dataObject.id}`}>{this.formatDate(dataObject[headObject.id])}</td>
          } else if (headObject.id === 'actions') {
            td = <td key={dataObject.id}>{actions.map((actionElement: any) => 
                <i 
                  key={`${dataObject.id}-${typeof actionElement.name === 'function' ? actionElement.name(dataObject.currentState) : actionElement.name}`} 
                  title={typeof actionElement.name === 'function' ? actionElement.name(dataObject.currentState) : actionElement.name} 
                  className={typeof actionElement.class === 'function' ? actionElement.class(dataObject.currentState) : actionElement.class} 
                  aria-hidden='true' 
                  onClick={() => {
                    if (typeof actionElement.name === 'function') {
                      dataObject.currentState = !dataObject.currentState
                      return actionElement.handler(dataObject, true)
                    }
                    return actionElement.handler(actionElement.name, dataObject.id)
                  }}
                />
              )}
            </td>
          } else {
            td = <td key={`${headObject.id}-${dataObject.id}`}>{dataObject[headObject.id]}</td>
          }
          return td
        })}
      </tr>
    ))
  }

  render() {
    const { data } = this.props
    return (data.body && data.body.length > 0 && (
      <table {...tableStyles}>
        <thead>
          <tr>
          {this.displayHead()}
          </tr>
        </thead>
        <tbody>
          {this.displayData()}
        </tbody>
      </table>
    )) || <div>No DATA</div>
  }
}

export default Table
