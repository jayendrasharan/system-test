import React, {useContext, useEffect, useState} from "react";
import Modal from "../../components/dialog_component";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {TodoDataContext} from "../../lib/contexts/todo_action_context";
import TodoActions from "../../actions/todo_actions";
import {ToastMessageContext} from "../../lib/contexts/message_context";
import DateFnsAdapter from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
const dateFns = new DateFnsAdapter();

function ManageTask(props) {

    const TodoProvider = useContext(TodoDataContext);
    const {todoState,dispatch} = TodoProvider;
    const {action,currentSelection,processing} = todoState;
    const [selectedDate, handleDateChange] = useState(currentSelection.dueDate?dateFns.parse(currentSelection.dueDate,"dd/MM/yyyy") : new Date());
    const [formData,setFormData] = useState({});
    const message = useContext(ToastMessageContext);

    useEffect(()=>{
        setFormData(currentSelection);
    },[currentSelection])

    const isUpdateRequired = (newData)=>{
        let hasUpdate = false;
        Object.keys(newData).forEach(key => {
            if(newData[key] !== currentSelection[key]){
                hasUpdate = true;
            }
        })
        return hasUpdate;
    }

    const handleSubmit = (data) => {
        if(action === 'create'){
            const newTask = {
                ...formData,
                dueDate:dateFns.format(
                    selectedDate,
                    'dd/MM/yyyy'
                ),
                createdAt:dateFns.format(
                    new Date(),
                    'dd/MM/yyyy'
                ),
                currentState: false,
                id: Date.now()
            }
            TodoActions.addNewTask(dispatch,message,newTask);
        }
        else if(action === 'update'){
            const updatedTask = {
                ...formData,
                dueDate:dateFns.format(
                    selectedDate,
                    'dd/MM/yyyy'
                ),
            }
            if(isUpdateRequired(updatedTask)){
                TodoActions.updateTask(dispatch,message,updatedTask);
            }
            else {
                handleClose()
            }
            handleDateChange(new Date())
        }
        else if(action === 'delete'){
            TodoActions.deleteTask(dispatch,message,currentSelection);
        }
        handleDateChange(new Date())
        setFormData({});
    }


    const handleClose = () => {
        TodoActions.setAction(dispatch,null);
    }

    const handleFormDataChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const readOnly = action === 'view';
    return(
        <Modal type={action} open={Boolean(action)} handleClose={handleClose} handleSubmit={handleSubmit} loading={processing}>
            {action !== 'delete' ? <Grid container spacing={4} alignItems={"center"} justify={"flex-start"}>
                <Grid item xs={12}>
                    <TextField
                        name={"title"}
                        label={"Summary"}
                        required
                        aria-readonly={readOnly}
                        fullWidth
                        value={formData.title}
                        onChange={handleFormDataChange}
                        inputProps={{maxLength:140,minLength:10,readOnly:readOnly}}
                        defaultValue={currentSelection.title}
                        error={(formData.length > 140)}
                        helperText={<div className={"align-right"}>{(formData&&formData.title&&formData.title.length)||0}/140</div>}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name={"description"}
                        label={"Description"}
                        required
                        fullWidth
                        aria-readonly={readOnly}
                        value={formData.description}
                        onChange={handleFormDataChange}
                        inputProps={{maxLength:500,minLength:10,readOnly:readOnly}}
                        multiline
                        defaultValue={currentSelection.description}
                        error={(formData.length > 500)}
                        helperText={<div className={"align-right"}>{(formData&&formData.description&&formData.description.length)||0}/500</div>}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputLabel id="dueDate">Due Date*</InputLabel>
                </Grid>
                <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        value={selectedDate}
                        defaultValue={currentSelection.dueDate?dateFns.parse(currentSelection.dueDate,"dd/MM/yyyy"):new Date()}
                        placeholder="10/10/2018"
                        onChange={date => handleDateChange(date)}
                        minDate={new Date()}
                        format="dd/MM/yyyy"
                        name="dueDate"
                        id="dueDate"
                        aria-readonly={readOnly}
                        disabled={readOnly}
                    />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="priority">Priority</InputLabel>
                        <Select
                            labelId="priority"
                            id="priority"
                            name="priority"
                            required
                            aria-readonly={readOnly}
                            value={formData.priority}
                            inputProps={{readOnly:readOnly}}
                            defaultValue={currentSelection.priority}
                            onChange={handleFormDataChange}
                        >
                            <MenuItem value={"none"}>None</MenuItem>
                            <MenuItem value={"low"}>Low</MenuItem>
                            <MenuItem value={"medium"}>Medium</MenuItem>
                            <MenuItem value={"high"}>High</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={"subtitle1"}>Created On : {currentSelection.createdAt}</Typography>
                    <Typography variant={"subtitle1"}>Current State : {currentSelection.currentState?"Completed":"Pending"}</Typography>
                </Grid>
                <Grid item xs={12}/>
            </Grid>:<Typography> Do you want to delete task <i>'{currentSelection.title}'</i> ?</Typography>}
        </Modal>
    )
}

export default ManageTask;