import { connect } from 'react-redux';
import TabsComponent from '../../Components/Tabs/TabsComponent';
import getTableData from '../../actions/action-get-tableData';
import addTask from '../../actions/action-add-task';
const mapStateToProps = state => {
    return {
        tableData: state.tableData,
        gridData:state.gridData
    };
}
const mapDispatchToProps = dispatch => {
    return {
     getTableData: (tabName,gridData) => dispatch(getTableData(tabName,gridData)),
     addTask: (taskDetails,gridData) => dispatch(addTask(taskDetails,gridData))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(TabsComponent); 