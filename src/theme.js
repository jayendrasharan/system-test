import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    palette:{
        primary: {
            main: '#03a9f4'
        },
        secondary:{
            main: '#03a9f4'
        }
    },
    overrides: {
        MuiFormControl: {
            root:{
                minWidth: '120px'
            }
        },
        MuiIconButton: {
            root: {
                color: '#03a9f4'
            }
        },
        MuiDialogTitle: {
            root:{
                padding: "16px 24px 0 24px"
            }
        }
    }
});

export default theme;