import React from "react";
import {forwardRef} from "react";
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import Settings from '@material-ui/icons/Settings';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox color="secondary" {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check color="primary" {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear color="primary" {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline color="primary" {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight color="primary" {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit color="primary" {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt color="primary" {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList color="primary" {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear color="primary" {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search color="primary" {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    Settings: forwardRef((props, ref) => <Settings color="primary" {...props} ref={ref} />),
};

//Adding selection to true will enable bulk actions
export const tableOptions = {
    showTitle:false,
    actionsColumnIndex: -1,
    selectableRowsOnClick: true,
    paging:false,
    headerStyle:{
        textAlign:'center'
    },
    cellStyle:{
        textAlign:'center'
    },
    draggable:true,
    searchable:true,
    sorting:true,
    emptyRowsWhenPaging:false,
    debounceInterval:600
};

export default tableIcons;