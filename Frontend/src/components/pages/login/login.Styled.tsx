import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;

  form {
    background-color: #000000d3;
    padding: 2rem 4rem 2rem 4rem;
    gap: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    position: absolute;
  }

  input {
    all: unset;
    background-color: #4141419a;
    padding: 0.5rem;
    border-radius: 6px;
    border: 2px solid transparent;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #dededee0;
    text-align: center;
    min-width: 200px;
    max-width: 200px;
  }

  input:focus {
    border: 2px #dededee0 solid;
  }

  .button1 {
    background-color: #6b7f9e;
    padding: 1rem 2rem 1rem 2rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    font-weight: bold;
    color: #dedede;
    cursor: pointer;
  }

  .button1:hover {
    background-color: #86a6d4;
    color: #ffffff;
  }

  .logo {
    text-align: center;
  }

  .logo img {
    width: 80px;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .mensagemErro {
    color: #d82323;
    font-weight: 500;
  }

  .p {
    font-size: 12px;
    color: #6b7f9e;
    font-weight: 500;
    font-style: italic;
  }

  .foto {
    width: 100rem;
    height: auto;
  }
`;
