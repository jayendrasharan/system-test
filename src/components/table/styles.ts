// tslint:disable:object-literal-key-quotes
import { css } from 'glamor'

const tableStyles = css({
  backgroundColor: 'antiquewhite',
  width: '100%',
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  textAlign: 'center',
  ' th': {
    // padding: '0px 50px',
    height: '50px'
  },
  ' thead > tr': {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1rem'
  },
  ' tbody': {
    ' tr': {
      height: '30px'
    },
    ' tr:nth-child(odd)': {
      backgroundColor: '#f2f2f2'
    },
    ' td > i': {
      padding: '2px 7px',
      fontSize: '1rem'
    }
  },
  // '@media screen and (max-width: 970px)': {
  //   ' th': {
  //     padding: '0px 30px'
  //   }
  // },
  // '@media screen and (max-width: 767px)': {
  //   ' th': {
  //     padding: '0px 10px'
  //   }
  // }
})

export { tableStyles }