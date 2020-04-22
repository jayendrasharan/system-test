import React from 'react';
import LocalStorageService from './utils/localstorageservice';
import ToDoFormModal from './modals/to-do-form-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom';


class AddUpdateToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addUpdateToDoForm: JSON.parse(JSON.stringify(ToDoFormModal)),
            isChangedDate: false,
            selectedDate: new Date(),
            redirectPage: false
        }
        this.localStorageService = new LocalStorageService();
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let paramReceived = '';
        if ((!!this.props.match.params) && (!!this.props.match.params.id) && (paramReceived = this.props.match.params.id)) {
            let toDoList = this.localStorageService.retrieveDataItem('toDoList');
            this.mapDataToForm(toDoList[this.props.match.params.id - 1]);
        }
    }

    mapDataToForm(dataObj) {
        let localForm = this.state.addUpdateToDoForm;
        localForm.id.value = dataObj.id;
        localForm.currentState.value = dataObj.currentState;
        localForm.title.value = dataObj.title;
        localForm.description.value = dataObj.description;
        localForm.createdAt.value = dataObj.createdAt;
        if (dataObj.dueDate !== '') {
            let d = dataObj.dueDate.split('-');
            let date = new Date();
            date.setDate(d[0]);
            date.setMonth(d[1] - 1);
            date.setFullYear(d[2]);
            localForm.dueDate.value = date;
            this.setState(() => ({ selectedDate: date, isChangedDate: true }));
        }
        else {
            localForm.dueDate.value = new Date();
        }
        localForm.priority.value = dataObj.priority;
        this.setState({ addUpdateToDoForm: localForm });
    }

    mapFormToData(localForm) {
        let dataObj = {};
        dataObj.id = localForm.id.value;
        dataObj.currentState = localForm.currentState.value;
        dataObj.title = localForm.title.value;
        dataObj.description = localForm.description.value;
        let date = new Date();
        if (dataObj.id === -1) {
            dataObj.createdAt = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        }
        else {
            dataObj.createdAt = localForm.createdAt.value;
        }
        if (this.state.isChangedDate) {
            date = this.state.selectedDate;
            dataObj.dueDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        }
        else {
            dataObj.dueDate = '';
        }
        dataObj.priority = parseInt(localForm.priority.value);
        return dataObj;
    }

    handleChange(field, e) {
        let copyOfToDoForm = this.state.addUpdateToDoForm;
        copyOfToDoForm[field]['value'] = e.target.value;
        copyOfToDoForm[field]['errorMessage'] = e.target.value;
        this.setState({ addUpdateToDoForm: copyOfToDoForm });
    }

    handleChangeDate = date => {
        this.setState({ selectedDate: date, isChangedDate: true })
    }

    handleValidation = () => {
        let isvalid = true;
        let copyOfToDoForm = this.state.addUpdateToDoForm;
        Object.keys(copyOfToDoForm).map(key => {
            if (!!copyOfToDoForm[key].isRequired && ((copyOfToDoForm[key].value !== false || parseInt(copyOfToDoForm[key].value) !== '0') && !copyOfToDoForm[key].value)) {
                copyOfToDoForm[key].errorMessage = 'Required Field';
                isvalid = false;
            }
            else if (!(copyOfToDoForm[key].value === '' || copyOfToDoForm[key].value === 0) && !!copyOfToDoForm[key].pattern) {
                var regex = new RegExp(copyOfToDoForm[key].pattern);
                var url = copyOfToDoForm[key].value;
                if (regex.test(url) === false) {
                    isvalid = false;
                    copyOfToDoForm[key].errorMessage = 'Required Field';
                }
            }
            else { copyOfToDoForm[key].errorMessage = ''; }
        }
        );
        this.setState({ addUpdateToDoForm: copyOfToDoForm });
        return isvalid;
    }

    handleSave = () => {
        if (this.handleValidation()) {
            let bool = window.confirm('Are You sure want to save changes?');
            if (bool) {
                let dataObj = this.mapFormToData(this.state.addUpdateToDoForm);
                let toDoList = JSON.parse(JSON.stringify(this.localStorageService.retrieveDataItem('toDoList')));
                if (toDoList === null) {
                    toDoList = [];
                }
                if (dataObj.id === -1 || toDoList === null || toDoList.length === 0) {
                    dataObj.id = toDoList.length + 1;
                    toDoList.push(dataObj);
                }
                else {
                    toDoList[dataObj.id - 1] = dataObj;
                }
                this.localStorageService.storeDataItem('toDoList', toDoList);
                this.setState({ redirectPage: true });
            }
        }
        else {

        }
    }

    setRedirection = () => {
        this.setState({ redirectPage: true });
    }

    render() {

        if (this.state.redirectPage) {
            return <Redirect to={'/'} />
        }
        return <div style={{ padding: '4%' }}>
            <div className='form-row' style={{ padding: '1%' }}>
                <div className={'form-group' + ' ' + 'col-sm-6'}>
                    <div class='row'>
                        <div class='col-sm-3'>
                            <label>Title:</label>
                        </div>
                        <div class='col-sm-9'>
                            <input required type="text" className="form-control" placeholder="Enter Title" name="title" value={this.state.addUpdateToDoForm.title.value} onChange={this.handleChange.bind(this, 'title')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-row' style={{ padding: '1%' }} >
                <div className={'form-group' + ' ' + 'col-sm-6'}>
                    <div class='row'>
                        <div class='col-sm-3'>
                            <label>Description:</label>
                        </div>
                        <div class='col-sm-9'>
                            <textarea required style={{ width: "500px" }} className="form-control" placeholder="Enter Description" name="description" value={this.state.addUpdateToDoForm.description.value} onChange={this.handleChange.bind(this, 'description')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-row' style={{ padding: '1%' }}>
                <div className={'form-group' + ' ' + 'col-sm-6'}>
                    <div class='row'>
                        <div class='col-sm-3'>
                            <label>Priority:</label>
                        </div>
                        <div class='col-sm-9'>
                            <select required className="form-control" placeholder="Enter Priority" name="priority" value={this.state.addUpdateToDoForm.priority.value} onChange={this.handleChange.bind(this, 'priority')}>
                                <option value={0}>None</option>
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={'form-group' + ' ' + 'col-sm-6'}>
                    <div class='row'>
                        <div class='col-sm-3'>
                            <label>Due Date:</label>
                        </div>
                        <div class='col-sm-9'>
                            <DatePicker
                                name='dueDate'
                                selected={this.state.selectedDate}
                                onChange={this.handleChangeDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-row' style={{ padding: '1%' }}>

                <div className={'form-group' + ' ' + 'col-sm-4'}>
                    <div class='row'>
                        <div class='col-sm-3'>
                            <button onClick={this.setRedirection}>Cancel</button>
                        </div>
                        <div class='col-sm-3'>
                            <button onClick={this.handleSave} style={{ backgroundColor: '#008CBA' }}>
                                Save
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    }

}

export default AddUpdateToDoForm;