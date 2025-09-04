import * as Style from "./UserTag.Styed";
import { MdLogout, MdSettings } from "react-icons/md";

type Props = {
  onLogout: () => void;
};

export const UserTag = ({onLogout}:Props) => {

  const username = localStorage.getItem("nome");

  return (
    <>
      <Style.Container>
        <div className="admin-card">
          <div className="profile-icon">
            <img src="src/assets/icon-placeholder.png" width="55"></img>
          </div>
          <div className="user-info">
            <div className="welcome">Bem-Vindo</div>
            <div className="role">  {username}  </div>
          </div>
            
            <section>
            <button className="logout" onClick={onLogout}>
            <MdLogout className="logout-icon" />
            </button>
            
            <button className="config">
            <MdSettings className="settings-icon" />
            </button>
            </section>

        </div>
      </Style.Container>
    </>
  );
};

export default UserTag;
