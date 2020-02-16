/**
 * Bare minimum component that holds functionalities through props
 * picks space, color, fonts objects from theme/indext.tsx; and renders
 * under the ThemeProvider context provided by styled-components.
 */
import styled, { css } from 'styled-components';
import { 
  background, color, border, layout, position, space, typography, fontStyle,
} from 'styled-system';
import { BoxProps } from '../../react-app-env';

const Box = styled.div<BoxProps>`
  ${space}
  ${background}
  ${color}
  ${border}
  ${layout}
  ${position}
  ${typography}
  ${fontStyle}
  ${({ cursor }) => cursor && css`
    cursor: ${cursor};
  `}
`

export default Box;
