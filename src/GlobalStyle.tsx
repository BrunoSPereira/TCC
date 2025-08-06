import { createGlobalStyle } from "styled-components";
 
export const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: Poppins;

    border: 0;
    background-color: #b7b6b6ed;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

  main{
  display: flex;
  width: 100vw;
  height: 100vh;
  }
`;