/**
 * Extends Flex styled components and using as polymorphic prop
 * and dynamically swaping the element type to button.
 */
import styled from 'styled-components';
import Flex from './Flex';
import { ButtonProps } from '../../react-app-env';
import { buttonStyle } from 'styled-system';

const Button = styled(Flex).attrs(() => ({ as: 'button' }))<ButtonProps>`
  ${buttonStyle}
`

Button.defaultProps = {
  variant: 'primary'
}

export default Button;
