/**
 * Theme object required for styled towards styled-components.
 */
const colors = {
  black: 'rgb(21, 21, 21)',
  white: '#fff',
  grey: '#62676a',
  darkRed: '#a01c32',
  red: '#bf223c',
  lightRed: '#ec93a2',
  lightGrey: '#d5d7d8',
  darkGrey: '#1d1f20',
  label: 'rgb(88, 88, 88)',
  border: '#ccc',
  options: '#f3f3f3',
  darkBlue: '#276d9b',
  blue: '#0464dd',
  lightBlue: '#7cb7de',
  orange: '#e06d10',
  green: '#46a46c',
  darkGreen: '#285d3d',
  lightGreen: '#b0ddc2'
}

export default {
  breakpoints: ['600px', '900px', '1200px', '1800px'],
  space: [0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 48, 64, 128],
  sizes: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 128, 256, 512],
  fontSizes: [10, 12, 14, 16, 18, 24, 30, 36, 72],
  buttons: {
    primary: {
      backgroundColor: colors.blue,
      color: colors.white,
      borderStyle: 'none',
      borderRadius: 3,
      borderWidth: '2px',
      "&:disabled": {
        backgroundColor: colors.options,
        color: colors.black,
        borderStyle: 'solid',
      }
    }
  },
  fontWeights: {
    regular: 400,
    bold: 600,
    extraBold: 900
  },
  radii: [0, 1, 2, 4, 8, 16],
  colors: colors
}
