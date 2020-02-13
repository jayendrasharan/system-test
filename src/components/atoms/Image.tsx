/**
 * Adds extra capabilities to html img tag.
 */
import styled from 'styled-components';
import { background, position, space } from 'styled-system';
import { ImageProps } from '../../react-app-env';

const Image = styled.img<ImageProps>`
  ${background}
  ${position}
  ${space}
`

export default Image;
