import styled from "styled-components";

export const Container = styled.div`
  background: #1e1e1e;
  position: fixed;       
  top: 60px;                
  left: 0;   
  width: 250px;
  height: calc(100vh - 60px);     
  
  padding: 2rem 0.5rem;
  padding-left: 1rem;
  color: white;       
  
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.5));
  z-index: 10;
`;

