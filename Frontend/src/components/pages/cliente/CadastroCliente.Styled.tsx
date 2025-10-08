import styled from "styled-components";

export const Container = styled.div`
  label {
    display: flex;
  }

  form {
    background-color: #303030;
    padding: 1.5rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    width: 100%;
    max-width: 100%;

    box-sizing: border-box;
    overflow: auto;
  }

  input {
    all: unset;
    background-color: #414141;
    border: 2px solid transparent;
    box-sizing: border-box;
    padding: 0.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #dededee0;
  }

  .checkbox{
    
  }

  :focus {
    border: 2px #dededee0 solid;
  }

  .sessao {
    border: 2px #dededee0 solid;
    border-radius: 6px;
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 2rem;
    width: 100%;
    box-sizing: border-box;
  }

  .icon {
    font-size: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 0.5rem;
  }

  .Buttons {
    display: flex;
    gap: 1.2rem;
  }

  .Cancelar {
    padding: 1rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    border: 3px #6b7f9e solid;
    border-radius: 6px;
    color: #6b7f9e;
    font-weight: 700;
    min-width: 150px;
    cursor: pointer;
  }

  .Salvar {
    background-color: #6b7f9e;
    padding: 1rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #ffffff;
    min-width: 150px;
    cursor: pointer;
  }
<div class="checkbox-wrapper-22">
  <label class="switch" for="checkbox">
    <input type="checkbox" id="checkbox" />
    <div class="slider round"></div>
  </label>
</div>

<style>
  .checkbox-wrapper-22 .switch {
    display: inline-block;
    height: 34px;
    position: relative;
    width: 60px;
  }

  .checkbox-wrapper-22 .switch input {
    display:none;
  }

  .checkbox-wrapper-22 .slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: .4s;
  }

  .checkbox-wrapper-22 .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: .4s;
    width: 26px;
  }

  .checkbox-wrapper-22 input:checked + .slider {
    background-color: #66bb6a;
  }

  .checkbox-wrapper-22 input:checked + .slider:before {
    transform: translateX(26px);
  }

  .checkbox-wrapper-22 .slider.round {
    border-radius: 34px;
  }

  .checkbox-wrapper-22 .slider.round:before {
    border-radius: 50%;
  }
</style>

  .Cancelar:hover {
    opacity: 0.5;
  }

  .Salvar:hover {
    opacity: 0.5;
  }

  .error-message {
    color: #c20a0a;
  }


  .checkbox{
    appearance: none;
  }


/* tabela */

  table {
    border-collapse: collapse;
    margin: 1rem;
  }

  td,
  th {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd;
  }
`;
