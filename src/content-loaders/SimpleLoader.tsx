import styled, { keyframes } from 'styled-components';
import { Flex } from '../components/atoms';


const Spinner = keyframes`
  to { -webkit-transform: rotate(360deg); }
`
const SimpleLoader = styled(Flex)`
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 3px solid ${({ theme: { colors }}) => colors.lightGrey};
  border-radius: 50%;
  border-top-color: ${({ theme: { colors }}) => colors.darkGrey};
  animation: ${Spinner} 1s ease-in-out infinite;
  -webkit-animation: ${Spinner} 1s ease-in-out infinite;
`

export default SimpleLoader;