import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalsProps {
  children: ReactNode
}
const Portals = ({ children }: PortalsProps) => {
  const modalNodeRef = useRef<HTMLElement>(document.getElementById('modal-root'))

  if(!modalNodeRef.current) {
    return null;
  }
  return (
    createPortal(
      children,
      modalNodeRef.current
    )
  )
}

export default Portals;