import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    background: #29274D; 
    position: relative;
  }

  h1 {
    margin: 0;
    font-weight: 300;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
