/**
 * Theme object required for styled towards styled-components.
 */
const colors = {
  black: 'rgb(21, 21, 21)',
  white: '#fff',
  label: 'rgb(88, 88, 88)',
  border: '#ccc',
  options: '#f3f3f3',
  blue: '#0464dd'
}

export default {
  breakpoints: ['600px', '900px', '1200px', '1800px'],
  space: [0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 48, 64, 128],
  sizes: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 128],
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
