import styled from "styled-components";

export const Container = styled.div`

  width: 250px;
  height: 100vh;     
  padding-top: 0.5rem;
  background-color: #303030;
  padding: 1rem;

.Links {
  
  p{
    font-size: 18px;
        margin-bottom: 25px;

  }

  li {
    list-style: none;
    margin-bottom: 20px;
  }

  a {
    all: unset;
    display: block;
    cursor: pointer;
    text-decoration: none;
  }

  a:active{
      color: #12B1FA;
  }

  a:hover {
    color: #12B1FA;
  }

}

`;

