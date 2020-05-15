import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    background-color: grey;
    font-family : 'Open Sans', sans-sarif;
    margin : 0;
    padding: 20px;
  }

  h1,h2,h3,h4 {
    font-family: 'Righteous', cursive;
  }`
