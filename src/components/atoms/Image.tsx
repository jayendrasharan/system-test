/**
 * Adds extra capabilities to html img tag.
 */
import styled, { css } from 'styled-components';
import { background, position, space, layout } from 'styled-system';
import { ImageProps } from '../../react-app-env';

const Image = styled.img<ImageProps>`
  ${background}
  ${position}
  ${space}
  ${layout}
  ${({ rotate }) => rotate && css`
    transform: rotate(${rotate}deg);
  `}
`

export default Image;
