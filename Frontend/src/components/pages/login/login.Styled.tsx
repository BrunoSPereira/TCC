import styled from "styled-components";

export const Container = styled.div`
  /* ocupa a tela toda e ignora o layout do pai (grid/columns) */
  position: fixed;
  inset: 0;

  /* centraliza perfeito no eixo X e Y */
  display: grid;
  place-items: center;
  /* se o pai for grid, isso garante que o container cubra tudo */

  form {
    background-color: #303030;
    padding: 1.5rem;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
  }

  input {
    background-color: #414141;
    padding: 0.5rem;
    margin: 0.5rem 1rem 1rem 1rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #dededee0;
  }

  button {
    background-color: #6b7f9e;
    padding: 1rem 2rem 1rem 2rem ;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    font-size: medium;
    color: #DEDEDE;
    cursor: pointer;
    }
     
    button:hover {
      background-color: #86a6d4;
      color: #ffffff; 
  }

  .logo {
    text-align: center;
  }

  .logo img {
    width: 80px;
  }
`;
