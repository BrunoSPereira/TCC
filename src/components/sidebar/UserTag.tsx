import * as Style from './UserTag.Styed'

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
    <div className="logout">
      <span className="logout-icon">⎋</span> sair
    </div>
    </div>

    </Style.Container>

    </>
  )
}

export default UserTag
