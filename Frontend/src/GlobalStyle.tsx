import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    background: none;
    border: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
  }

  body {
    background-color: #232323;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #DEDEDE;

  }

  main{
  display: flex;
  width: 100vw;
  height: 100vh;
  }
  
`;
