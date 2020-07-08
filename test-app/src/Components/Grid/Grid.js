import React, { Component } from 'react';
import Layout from '../HOC/Layout';
class Grid extends Component {

    getTableHeader = () => {
        let tableHeader = this.props.tableHeader.map((el,index) => {
            return (
                <th key={index}>{el.header}</th>
            )
        });
        return <tr>{tableHeader}</tr>

    }
    getTableData=()=>{
        let tableData = this.props.tableData.map((el,index) => {
            return (
               <tr key={index}><td>{el.fieldName}</td>
                <td>{el.title}</td>
                <td>{el.description}</td>
                <td>{el.createdAt}</td>
                <td>{el.dueDate}</td>
                <td>{el.priority}</td></tr>
            )
        });
        return tableData;
    }
    render() {
        return (
            <Layout>
                <table>
                    <thead>{this.getTableHeader()}</thead>
                   <tbody>{this.getTableData()}</tbody>
                </table>

            </Layout>
        )
    }
}

export default Grid;