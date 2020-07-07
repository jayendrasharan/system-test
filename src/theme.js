import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    overrides: {
        MuiFormControl: {
            root:{
                minWidth: '120px'
            }
        }
    }
});

export default theme;