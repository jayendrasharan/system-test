// tslint:disable:object-literal-key-quotes
import { css } from 'glamor'

const modalStyles = css({
  position: 'fixed',
  paddingTop: '10%',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  margin: 'auto',
  backdropFilter: 'blur(8px)',
  opacity: '1',
  transition: 'backdropFilter 2s position 2s height 2s width 2s',
  ' .content': {
    alignItem: 'center',
    maxWidth: '650px',
    padding: '20px',
    margin: 'auto',
    borderRadius: '20px',
    backgroundColor: '#fff'
  },
  ' .header': {
    borderBottom: '1px solid #ccc',
    padding: '15px 10px 10px 10px',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0',
    ' h2': {
      margin: '0px'
    }
  }
})

export { modalStyles }