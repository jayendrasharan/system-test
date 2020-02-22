// tslint:disable:object-literal-key-quotes
import { css } from 'glamor'

const formStyles = css({
  ' a': {
    color: '#08c',
  },

  ' select': {
    width: '147%',
    height: '50%',
    backgroundColor: 'antiquewhite'
  },
  
  ' code': {
    background: '#eee',
    padding: '.1rem',
    fontFamily: 'Menlo',
    fontSize: '13px',
    color: '#ff00aa',
  },
  
  ' input': {
    padding: '5px 2px 5px 2px',
    fontSize: '16px',
    width: '100%',
    display: 'block',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  
  ' input:focus': {
    borderColor: '#007eff',
    boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1)',
    outline: 'none',
  },
  
  ' input.error': {
    borderColor: 'red',
    boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(255, 0, 0, 0.1)',
  },

  ' input[type="date"]::-webkit-clear-button, input[type="date"]::-webkit-inner-spin-button': {
    display: 'none'
  },
  
  ' label': {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '.5rem',
  },

  ' textArea': {
    width: '100%',
    height: '110px'
  },
  
  ' .input-feedback': {
    color: 'red',
    marginTop: '.25rem',
  },
  
  ' button': {
    maxWidth: '150px',
    margin: '20px 0',
    padding: '12px 20px',
    borderStyle: 'none',
    borderRadius: '5px',
    backgroundColor: '#08c',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
    fontSize: '17px',
    fontWeight: '500',
    color: '#fff',
    cursor: 'pointer',
    outline: 'none',
    webkitAppearance: 'none',
  },
  
  ' button:disabled': {
    opacity: '.5',
    cursor: 'not-allowed !important',
  },
  
  ' button + button': {
    marginLeft: '.5rem',
  },

  ' button.outline': {
    backgroundColor: '#eee',
    border: '1px solid #aaa',
    color: '#555',
  },
  ' .dropDownSection': {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row'
  },
  ' .buttonSection': {
    bottom: '0px',
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

export { formStyles }