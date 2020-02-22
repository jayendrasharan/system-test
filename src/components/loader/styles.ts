// tslint:disable:object-literal-key-quotes
import { css, keyframes } from 'glamor'

const spin = keyframes('spin', { // optional name
  '0%': { transform: 'rotate(0deg),' },
  '100%': { transform: 'rotate(360deg)' }
})

const loaderStyles = css({
  position: 'absolute',
  paddingTop: '10%',
  width: '100%',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  margin: 'auto',
  backdropFilter: 'blur(15px)',
  opacity: '1',
  transition: 'backdropFilter 2s position 2s height 2s width 2s',
  ' .loader': {
    position: 'relative',
    margin: 'auto',
    border: '16px solid cadetblue',
    borderRadius: '50%',
    borderTop: '16px solid white',
    width: '40px',
    height: '40px',
    animation: `${spin} 2s linear infinite`, /* Safari */
  }
})

export { loaderStyles }