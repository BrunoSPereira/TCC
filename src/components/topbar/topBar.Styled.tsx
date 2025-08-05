import styled from "styled-components";

export const Container = styled.div`
  background: #1e1e1e;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  padding: 0 2rem;

  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.5));
  z-index: 10;

  color: white;
`;
