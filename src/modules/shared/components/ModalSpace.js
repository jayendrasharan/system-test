import {closeModal} from '../actions/modalActions'
import {connect} from 'react-redux'
import Modal from './Modal'
import './Modal.scss'
const mapStateToProps = state => ({
    modalStore: state.modalStore
})

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)