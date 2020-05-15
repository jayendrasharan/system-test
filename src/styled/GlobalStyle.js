import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    background-color: #fff;
    font-family : 'Open Sans', sans-sarif;
  }

  h1,h2,h3,h4 {
    font-family: 'Righteous', cursive;
  }`
