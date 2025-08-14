import * as Style from "./UserTag.Styed";
import { MdLogout, MdSettings } from "react-icons/md";

export const UserTag = () => {
  return (
    <>
      <Style.Container>
        <div className="admin-card">
          <div className="profile-icon">
            <img src="src/assets/icon-placeholder.png" width="55"></img>
          </div>
          <div className="user-info">
            <div className="welcome">Bem-Vindo</div>
            <div className="role">Adm</div>
          </div>
          <button className="logout">
            <MdSettings className="settings-icon" />
            <MdLogout className="logout-icon" />
          </button>
        </div>
      </Style.Container>
    </>
  );
};

export default UserTag;
