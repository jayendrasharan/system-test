import React, { ReactNode } from 'react';
import { Flex } from '../atoms'
import { WithSuspenseLoader } from '../../helpers';

interface LayoutProps {
  children: ReactNode
}

const Layout = ({
  children
}: LayoutProps) => {
  return (
    <Flex flexDirection='column' width={['100%', '90%', '80%']} alignItems='center' mx='auto'>
      {children}
    </Flex>
  )
}

export default WithSuspenseLoader(Layout);