import React from 'react'
import './style.css'
import { connect } from 'react-redux'
import { togglePopup } from '../Store/actions/actions'

import RoundButton from '../ui/Button/roundButton'

const Aside = (props) => {

    const taskObject = {
        id: '',
        status: false,
        summary: '',
        description: '',
        createdAt: '',
        dueDate: '',
        priority: 'none'
    }

    return (
        <div className='side-drawer-container'>
            <h1>Side Drawer</h1>
            <RoundButton size={{ 'height': '100px', 'width': '100px' }} handleClick={() => props.togglePopup({ type: 'new', data: taskObject })} />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    togglePopup: (contentType) => dispatch(togglePopup(contentType)),
})

export default connect('', mapDispatchToProps)(Aside);