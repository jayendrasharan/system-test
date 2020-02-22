import React from 'react'

import { modalStyles } from './styles'

interface ModalProps {
  onClose (mode?: string, id?: number): void
}

export default class Modal extends React.Component<ModalProps> {
  modal: any

  constructor(props: ModalProps) {
    super(props);
    this.modal = React.createRef();
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.handleKeyUp, false);
  }
  
  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleKeyUp, false);
  }

  handleKeyUp = (e: any) => {
    const { onClose } = this.props
    const keys = {
      27: () => {
        e.preventDefault();
        window.removeEventListener('keyup', this.handleKeyUp, false);
        onClose();
      },
    };
  
    if (keys[e.keyCode]) { keys[e.keyCode]() }
  }

  onClose = () => {
    return this.props.onClose && this.props.onClose('cancel', -1);
  }

  render() {
    return <div {...modalStyles}>
      <div className='content' ref={this.modal}>
        <div className='header'>
          <h2>Modal Window</h2>
          <i className='fa fa-times' aria-hidden='true' onClick={this.onClose} />
        </div>
        <div>{this.props.children}</div>
      </div>
    </div>
  }
}