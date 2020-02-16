import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Flex } from '../components/atoms';

const Spinner = keyframes`
  to { -webkit-transform: rotate(360deg); }
`
const SimpleLoaderContainer = styled(Flex)`
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: auto;
  border: 3px solid ${({ theme: { colors }}) => colors.lightGrey};
  border-radius: 50%;
  border-top-color: ${({ theme: { colors }}) => colors.darkGrey};
  animation: ${Spinner} 1s ease-in-out infinite;
  -webkit-animation: ${Spinner} 1s ease-in-out infinite;
  z-index: 15;
`

const SimpleLoader = () => (
  <Flex width='100%' height='100vh'>
    <SimpleLoaderContainer />
  </Flex>
)

export default SimpleLoader;