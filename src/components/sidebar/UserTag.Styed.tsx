import styled from "styled-components";

export const Container = styled.div`

.admin-card{
  background-color: #0000006c;
  border-radius: 15px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box; 
  margin-bottom: 1rem;

    }

  .profile-icon {
  width: 45px;
  height: 45px;
  background-color: rgba(255, 255, 255, 0.1); 
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
    }

    .user-info {
      display: flex;
      flex-direction: column;

    }

    .user-info .welcome {
      font-size: 14px;
      ;
    }

    .user-info .role {
      color: #dcdcdc;
      font-size: 12px;  
    }

    .logout {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: red;
      cursor: pointer;
      font-size: 14px;
    }

    .logout-icon {
      margin-right: 5px;
    }
`;

