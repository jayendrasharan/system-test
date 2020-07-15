import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import AddTaskField from './AddTaskField';
import AddDueDate from './AddDueDate';
import AddPriority from './AddPriority';
import AddControlButtons from './AddControlButtons';


function getModalStyle() {
    const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid white',
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    }
}));

export default function AddTask(props) {
    console.log(props.editFlag);
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [summary, setSummary] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');
    const [priority, setPriority] = React.useState('');

    React.useEffect(() => {
        setOpen(props.editFlag)
    }, [props.editFlag])

    console.log({ open });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
      setSummary('');
      setDescription('');
      setDueDate('');
      setPriority('');
      props.handleEditFlag();
  };

    const addSummary = (event) => {
        setSummary(event.target.value);
    }

    const addDescription = (event) => {
        setDescription(event.target.value);
    }

    const addDueDate = (event) => {
        setDueDate(event.target.value);
    }

    const addPriority = (event) => {
        setPriority(event.target.value);
    }

    const handleSubmit = () => {
        if (!summary) {
            alert("Enter Summary");
            return;
        }
        if (summary.length < 10) {
            alert("Summary should be more than 10 characters");
            return;
        }
        if (summary.length > 141) {
            alert("Summary should be less than 140 characters");
            return;
        }

        if (description) {
            if (description.length < 10) {
                alert("Description should be more than 10 characters");
                return;
            }
            if (description.length > 501) {
                alert("Description should be less than 500 characters");
                return;
            }
        }

        props.submit(summary,description,dueDate,priority);
        setOpen(false);
        setSummary('');
        setDescription('');
        setDueDate('');
        setPriority('');
    };

    const handleEdit = () => {

        if (!summary&&!props.editRow.summary) {
            alert("Enter Summary");
            return;
        }
        
        if (summary && summary.length < 10) {
            alert("Summary should be more than 10 characters");
            return;
        }
        if (summary && summary.length > 141) {
            alert("Summary should be less than 140 characters");
            return;
        }

        if (description) {
            if (description.length < 10) {
                alert("Description should be more than 10 characters");
                return;
            }
            if (description.length > 501) {
                alert("Description should be less than 500 characters");
                return;
            }
        }
        var par1, par2, par3, par4;
        if (!summary)
            par1 = props.editRow.summary;
        else
            par1 = summary;
        if (!description)
            par2 = props.editRow.description;
        else
            par2 = description;
        if (!dueDate)
            par3 = props.editRow.dueDate;
        else
            par3 = dueDate;
        if (!priority)
            par4 = props.editRow.priority;
        else
            par4 = priority;

            props.edit(par1, par2, par3, par4);

        setOpen(false);
        setSummary('');
        setDescription('');
        setDueDate('');
        setPriority('');
    };

    



  const body = (
    <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{props.editFlag ? 'Edit Task' : 'Add Task'}</h2>
          <AddTaskField addSummary={addSummary} addDescription={addDescription} editRow={props.editRow} editFlag={props.editFlag}/>
          <AddDueDate addDueDate={addDueDate} editRow={props.editRow} editFlag={props.editFlag}/>
          <AddPriority addPriority={addPriority} editRow={props.editRow} editFlag={props.editFlag}/>
          <AddControlButtons close={handleClose} editRow={props.editRow} editFlag={props.editFlag} submit={handleSubmit} edit={handleEdit}/>
    </div>
  );

  return (
    <div>
              <Tooltip title="Add" aria-label="add">
                  <Fab color="primary" className={classes.fab}>
                      <AddIcon onClick={handleOpen}/>
                  </Fab>
              </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
