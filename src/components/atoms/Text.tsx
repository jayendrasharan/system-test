/**
 * Extends Flex styled components and using as polymorphic prop
 * and dynamically swaping the element type to p, h1-h6.
 */
import styled, { css } from 'styled-components';
import { typography, fontSize } from 'styled-system';
import { Flex } from '.';
import { TextProps } from '../../react-app-env';

const Text = styled(Flex)<TextProps>`
  ${typography}
  ${fontSize}
  ${({ cursor }) => cursor && css`
    cursor: ${cursor}
  `}
`

Text.defaultProps = {
  fontSize: 3
}

export default Text;
