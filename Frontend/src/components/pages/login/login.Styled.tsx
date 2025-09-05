import styled from "styled-components";

export const Container = styled.div`

  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  

  form {
    background-color: #303030;
    padding: 2rem;
    gap: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
  }

  input {
    all: unset;
    background-color: #414141;
    padding: 0.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #dededee0;
  }

  input:focus {
    background-color: #515151;
  }

  button {
    background-color: #6b7f9e;
    padding: 1rem 2rem 1rem 2rem ;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    font-weight: bold;
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

  section{
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 10px;
  }

  .mensagemErro{
    color: #d82323;
  }

   .p {
    font-size: 12px;
    color: #6b7f9e;
    font-weight: 500;
  }

`;
