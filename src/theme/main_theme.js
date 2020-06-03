import {createMuiTheme} from "@material-ui/core/styles";

const DefaultTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#4c10c1"
        },
        secondary: {
            main:"#4bd800"
        }
    },
    typography:{
        subtitle2:{
            fontWeight:'bold',
            fontSize:'1rem'
        }
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: "none",
                fontWeight: 400,
                minWidth: 100,
                fontSize: '1rem',
                borderRadius: "3px",
                boxShadow: 'unset',
            },
        },
        MuiTableCell: {
            root: {
                padding: '5px',
            },
            head: {
                fontWeight: 'bold'
            }
        },
    }
})

export default DefaultTheme;