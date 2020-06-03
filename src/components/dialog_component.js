import React, {createRef} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";


const useStyles = makeStyles(theme => ({
    formWrapper: {
        background: '#fff',
        width: '400px',
        padding: theme.spacing(3)
    },
    title: {
        textTransform: 'capitalize',
        paddingBottom: theme.spacing(2)
    },
    actionButtons: {
        paddingTop: '20px',
        textAlign: 'right',
        '& button': {
            marginRight: '20px',
            textTransform: 'capitalize',
        }
    },
    titleWrapper: {
        display:"flex",
        alignItems: "center",
        justifyContent: "space-between",
        '& button':{
            marginTop:'-25px'
        }
    }
}));

function Modal(props) {
    const classes = useStyles();
    const {handleClose,handleSubmit,children,loading,title,type,open} = props;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        handleSubmit(formData);
    }

    return (
        <Dialog
            maxWidth={"sm"}
            open={open}
            onClose={handleClose}
            aria-labelledby="create-form"
        >
            <DialogContent>
                {type !== 'delete' ? <div className={classes.formWrapper}>
                    <div className={classes.titleWrapper}>
                        <Typography variant="subtitle2" color="primary" component="span" className={classes.title}>
                            {title || `${type} Task`}
                        </Typography>
                        <IconButton onClick={handleClose}><CloseIcon fontSize={"small"}/></IconButton>
                    </div>
                        <form onSubmit={handleFormSubmit}>
                            {children}
                            {type !== 'view' && <div className={classes.actionButtons}>
                                <Button disabled={loading} type="button" variant={"contained"}
                                           onClick={()=>handleClose()} disableElevation>Cancel</Button>
                                <Button disabled={loading} type="submit" variant={"contained"} color="primary">Save</Button>
                            </div>}
                        </form>
                    </div>:
                    <div className={classes.formWrapper}>
                        {children}
                        <div className={classes.actionButtons}>
                            <Button disabled={loading} type="button" variant={"contained"} onClick={handleClose} disableElevation>No</Button>
                            <Button disabled={loading} type="button" variant={"contained"} color="primary" onClick={handleSubmit}>Yes, Confirm</Button>
                        </div>
                    </div>
                }
            </DialogContent>
        </Dialog>
    )
}

export default Modal;