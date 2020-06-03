import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    formWrapper:{
        width:'80%',
        paddingRight:theme.spacing(1)
    },
}));

export default function AddNewTask(props) {
    const classes = useStyles();
    const [newItemValue,setNewItemvalue] = useState("");
    const [error,setError] = useState(false);
    const {toDoList,setToDoList} = props;

    const handleAdd = () => {
        if(newItemValue && newItemValue.length > 2){
            const newTask = {
                id:(toDoList.length + 1),
                description:newItemValue,
                is_complete: false
            }
            let toDoLists = [...toDoList];
            toDoLists.push(newTask);
            setToDoList(toDoLists);
            setNewItemvalue("");
        }
        else {
            setError(true);
        }
    }

    return (
        <React.Fragment>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className={classes.formWrapper}>
                    <FormControl fullWidth error={error}>
                        <OutlinedInput onFocus={() => setError(false)} value={newItemValue} margin="dense" name="add"
                                       onChange={(e) => {
                                           setNewItemvalue(e.target.value)
                                       }}/>
                    </FormControl>
                    {error && <FormHelperText>*please enter description</FormHelperText>}
                </div>
                <Button disableRipple disableElevation onClick={handleAdd} component="span">Add</Button>
            </div>
        </React.Fragment>
    )
}