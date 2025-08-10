import { createGlobalStyle } from "styled-components";
 
export const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;

    font-family: Poppins;

    border: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
  }

  body {
    background-color: #b7b6b6ed;
    font-family: 'Poppins', sans-serif;
  }

  main{
  display: flex;
  width: 100vw;
  height: 100vh;
  }
`;