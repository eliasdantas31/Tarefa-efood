// src/styles/global.ts
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #fff;
    color: #333;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`