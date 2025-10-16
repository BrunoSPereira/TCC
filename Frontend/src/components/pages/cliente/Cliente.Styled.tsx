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

  .input {
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
  
  .input:focus {
    border: 2px #dededee0 solid;
  }

  .idInput{
    all: unset;
    background-color: #414141;
    border: 2px solid transparent;
    box-sizing: border-box;
    padding: 0.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #747474df;
    width: 3rem;
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

  .Cancelar:hover {
    opacity: 0.5;
  }

  .Salvar:hover {
    opacity: 0.5;
  }

  .error-message {
    color: #c20a0a;
  }

//Checkbox
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem; 
}

.checkbox-custom {
  all: unset;
  width: 16px;
  height: 16px;
  border: 2px solid #333;
  border-radius: 4px;
  background-color: #414141;
  cursor: pointer;
  display: inline-block;
  position: relative; 
}

.checkbox-custom:checked::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 4px;
  width: 6px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}


//Radio
.radio-wrapper {
  display: flex;
  align-items: center;
  gap: 8px; /* espaço entre checkbox e label */
}


.radio-custom {
  width: 16px;
  height: 16px;
  border: 2px solid #333;
  border-radius: 50%; /* círculo */
  background-color: #414141;
  cursor: pointer;
  display: inline-block;
  position: relative;
  
}

.radio-wrapper label{
  gap: 0.5rem;
}

.radio-custom:checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: #6b7f9e;
  border-radius: 50%;
  transform: translate(-50%, -50%);
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

  tr:hover {
  background-color: #9b9898;
}
`
