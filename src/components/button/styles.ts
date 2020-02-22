import { css } from 'glamor'

const buttonStyles = (selected: boolean) => css({
  width: '140px',
  backgroundColor: 'cadetblue',
  textAlign: 'center',
  padding: '5px',
  fontSize: '1rem',
  margin: '0px 6px',
  cursor: 'pointer',
  borderRadius: '10px',
  boxShadow: `${selected ? 'none' : '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}`
})

export { buttonStyles }
