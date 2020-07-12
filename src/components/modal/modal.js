import cn from "classnames";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Overlay from "../overlay/overlay";
import { Col, Row } from "react-flexbox-grid";


//To create modal which can be closed by pressing ESC key
class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyUp, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyUp, false);
    }

    handleKeyUp = (event) => {
        const { onClose } = this.props;

        if (event.keyCode === 27) {
            event.preventDefault();
            onClose();
            window.removeEventListener('keyup', this.handleKeyUp, false);
        }
    }

    render() {
        const { children, className, bodyClassName } = this.props;
        return (
            <Overlay>
                <div className={cn("dialog", className)}>
                    <Row>
                        <Col lg={12} className={bodyClassName}>
                            {children}
                        </Col>
                    </Row>
                </div>
            </Overlay>
        );
    }
}

Modal.propTypes = {
    className: PropTypes.string,
    bodyClassName: PropTypes.string,
    onClose: PropTypes.func,
};

Modal.defaultProps = {
    className: null,
    bodyClassName: null,
    onClose: () => {}
};

export default Modal;
