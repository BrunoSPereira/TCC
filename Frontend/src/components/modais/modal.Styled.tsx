import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 1000;
  background-color: #00000050;

  .ModalStyle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background-color: #414141;
    border-radius: 6px;
    color: #ffffff;
    padding: 2rem;
    font-size: 18px;
  }

  .Buttons {
    display: flex;
    gap: 1.2rem;
    justify-content: flex-end;
    width: 100%;
  }

  .sim {
    background-color: #212121;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #ffffff;
  }

  .nao {
    background-color: #6b7f9e;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #ffffff;
  }

  .sim:hover {
    opacity: 0.5;
  }

  .nao:hover {
    opacity: 0.5;
  }
`;
