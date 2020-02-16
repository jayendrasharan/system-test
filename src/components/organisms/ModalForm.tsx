import React from 'react';
import styled from 'styled-components';
import { Flex, Image } from '../atoms';
import { Portals } from '../../helpers';
import { ModalFormProps } from '../../react-app-env';
import { close } from '../../assets/icons';

const ModalBackgroundOverlay = styled(Flex)`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  opacity: 0.5;
`
const ModalContainer = styled(Flex)`
  position: fixed;
  z-index: 11;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CloseIcon = styled(Image)`
  position: absolute;
  right: 5%;
  top: 5%;
  cursor: pointer;
`

const ModalForm = ({
  children, open, onCloseModal
}: ModalFormProps) => {
  if(!open) return null;
  return (
    <Portals>
      <ModalBackgroundOverlay backgroundColor='lightGrey'/>
      <ModalContainer backgroundColor='white' minWidth={11} minHeight={11} borderRadius={4}>
        <CloseIcon src={close} size={3} onClick={onCloseModal}/>
        {children}
      </ModalContainer>
    </Portals>
  )
}

export default ModalForm;