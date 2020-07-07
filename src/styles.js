import { makeStyles } from '@material-ui/core/styles';
import { height } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height:'auto',
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        paddingBottom: theme.spacing(5),
        margin: 'auto',
        maxWidth: '70%',
        boxShadow: 'none',
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(1.5),
        },
    },
    taskButton:{
        margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
    display:{
        display:'flex'
    },
    selectPadding:{
        paddingTop:'40px',
        marginLeft:'20px',
        marginRight:'20px'
    },
    dateMargin:{
        marginLeft:'60%'
    },
    selectLabelMargin:{
        marginBottom:'-14px'
    },
    descLabel:{
        marginBottom:'20px'
    },



}))

export default useStyles