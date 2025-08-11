import * as Style from './UserTag.Styed'
import { FiLogOut } from "react-icons/fi";

export const UserTag = () =>  {

  return(
    <>
    
    <Style.Container style={{paddingInline: "1rem"}}>
   <div className='admin-card'> 
     <div className="profile-icon">
          <img src="src/assets/icon-placeholder.png" width="50"></img>
    </div>
 <div className="user-info">
     <div className="welcome">Bem Vindo</div>
     <div className="role">Administrador</div>
 </div>
     <button className="logout">
    <FiLogOut className="logout-icon" /></button>
    </div>

    </Style.Container>

    </>
  )
}

export default UserTag
