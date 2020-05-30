import React, { Component } from 'react';
import Layout from '../HOC/Layout';
import InputControls from '../InputControls/InputControls';

class AddTask extends Component {
    state = {
        showModal: false,
        formValues: this.props.config.addTask.formValues
    }
    openModal = () => {
        const resetFormValues= {
            "title": "",
            "description": "",
            "priority": "None",
            "dueDate": new Date(),
            "fieldName":"Pending",
            "createdAt":new Date()
        };
        this.setState({ showModal: true,formValues:resetFormValues });
       
    }
    closeModal = () => {
        this.setState({ showModal: false })
    }
    handleChange = (event, inputName) => {
        let updateFormValues = this.state.formValues;
        if (inputName === "dueDate") {
            updateFormValues[inputName] = event;
        }
        else {
            updateFormValues[inputName] = event.target.value
        }
        this.setState({ formValues: updateFormValues })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addTask(this.state.formValues,this.props.gridData);
       this.setState({showModal:false});
       this.props.openTab(null,this.props.selectedTabName);
    }
    getModal = () => {
        let inputControls = this.props.config.addTask.inputControls.map((el, index) => {
            return <Layout key={index}><InputControls labelName={el.labelName} fieldName={el.name} inputType={el.inputType} fieldValueChange={(event) => this.handleChange(event, el.name)}
                fieldValue={this.state.formValues[el.fieldValue]} config={this.props.config}/><br /></Layout>
        })
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <h1>{this.props.config.addTask.labelAddNewTask}</h1>
                    <form onSubmit={this.handleSubmit}>
                        {inputControls}
                        <br />
                        <input type="button" value="Cancel" onClick={() => this.closeModal()} />
                        <input type="submit" value="Submit" />

                    </form>
                </div>
            </div>
        )
    }
    render() {
        return (
            <Layout>
                <i className="fa fa-plus-circle addTask" onClick={() => this.openModal()} />
                {this.state.showModal && this.getModal()}
            </Layout>
        )
    }
}

export default AddTask;