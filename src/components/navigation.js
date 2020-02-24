import React from 'react'
import { connect } from 'react-redux';

import { updateCurrWindow } from '../Store/actions/actions'

import Navtab from '../ui/Button/navTab'

const navigation = (props) => {

    const handleClick = (type) => {
        if (type !== props.currWindow)
            props.updateWindow(type)
    }


    return (
        <div style={{ marginBottom: '30px' }}>
            <Navtab active={props.currWindow === 'all' ? true : ''} clicked={() => handleClick('all')}>All Tasks</Navtab>
            <Navtab active={props.currWindow === 'completed' ? true : ''} clicked={() => handleClick('completed')}>Complete Tasks</Navtab>
            <Navtab active={props.currWindow === 'incomplete' ? true : ''} clicked={() => handleClick('incomplete')}>Incomplete Tasks</Navtab>
        </div>
    )
}


const mapStateToProps = state => ({
    currWindow: state.crud.currWindow,
})

const mapDispatchToProps = (dispatch) => ({
    updateWindow: (payload) => dispatch(updateCurrWindow(payload)),
})


export default connect(mapStateToProps, mapDispatchToProps)(navigation);