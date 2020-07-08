import React from 'react'
import { footerStyles } from './styles'

interface FooterProps {
  styles?: object
}

const Footer = (props: FooterProps) => {
  return <div {...{...footerStyles, ...props.styles}}>
    <p>Copyright © 2020 by Nihanth Kethireddy</p>
    <p>All Rights Reserved (Just Kidding)</p>
  </div>
}

export default Footer