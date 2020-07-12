import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Overlay extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className='overlay'>{children}</div>
        );
    }
}

Overlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};

Overlay.defaultProps = {
    children: undefined,
};

export default Overlay;
