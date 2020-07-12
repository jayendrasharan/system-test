import {connect} from 'react-redux'
import LoaderView from './LoaderView'
const mapStateToProps = state => ({
    loader: state.loader
})

export default connect(mapStateToProps)(LoaderView)