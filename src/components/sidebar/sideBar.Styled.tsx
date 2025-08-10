import styled from "styled-components";

export const Container = styled.div`

  width: 250px;
  height: 100vh;     

  padding-top: 0.5rem;
    
  border-right-width: 2px;
  border-color: #969595;  
  border-style: solid;

  
  /* box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5); */
  z-index: 10;

  h1{
    font-weight: 600;
    padding: 1rem;
    text-align: center;
  }

.Links {
  li {
    list-style: none;

    a {
      all: unset;
      display: block;
      padding: 0.5rem 1rem;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        background: #606060;
      }
    }
  }
}


@media only screen and (max-width: 400px) {
  display: none;
}

`;

