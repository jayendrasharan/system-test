import React, { Component } from 'react';
import TabComponent from './TabComponent';
import Layout from '../HOC/Layout';
import Grid from '../Grid/Grid';
import Config from '../../config/Config';
import AddTask from '../Tasks/AddTask';
class TabsComponent extends Component {

    state = {
        tabNames: [
            { id: 0,key:"allTasks", name: "All tasks", selected: true }, { id: 1,key:"completed", name: "Completed", selected: false },
            { id: 2,key:"pending", name: "Pending", selected: false }
        ],
        selectedTabName:{ id: 0,key:"allTasks", name: "All tasks", selected: false }
    }
    openTab = (event=null, tabName) => {
        let updateTabNames = [
            { id: 0,key:"allTasks", name: "All tasks", selected: false }, { id: 1,key:"completed", name: "Completed", selected: false },
            { id: 2,key:"pending", name: "Pending", selected: false }
        ];
        updateTabNames[tabName.id]["selected"] = true;
        this.setState({ tabNames: updateTabNames,selectedTabName:tabName});
        this.props.getTableData(tabName.key,this.props.gridData);
    }
    render() {
        let configData=Object.assign({}, Config);
        const renderTabs = this.state.tabNames.map((tab) => {
            return (
                <TabComponent key={tab.id} tabName={tab.name} selected={tab.selected} openTab={(event)=>this.openTab(event, tab)} />
            )
        });
      return (
            <Layout>
                <div className="tab">
                    {renderTabs}
                </div>
                <Grid tableData={this.props.tableData} tableHeader={this.props.gridData.gridHeaderData}/>
                <AddTask gridData={this.props.gridData} config={configData}  addTask={this.props.addTask}
                selectedTabName={this.state.selectedTabName} openTab={(event,tabName)=>this.openTab(event,tabName)}/>
            </Layout>
        )
    }
}
export default TabsComponent; 
