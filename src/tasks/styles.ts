// tslint:disable:object-literal-key-quotes
import { css } from 'glamor'

const taskStyles = css({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '1200px',
  width: '100%',
  height: '100%',
  ' > div': {
    padding: '11px 8px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ' .tabs': {
    justifyContent: 'center'
  },
  ' .dataList': {
    position: 'relative',
    minHeight: '344px',
    overflowX: 'auto',
    alignItems: 'baseline'
  },
  ' .add': {
    justifyContent: 'flex-end',
    ' i': {
      fontSize: '3rem',
      color: 'black',
      textShadow: '2px 3px 6px black'
    }
  }
})

export { taskStyles }