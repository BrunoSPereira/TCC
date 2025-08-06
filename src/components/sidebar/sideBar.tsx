import * as Style from './sideBar.Styled'
import { Link } from "react-router-dom";

export const SideBar = () =>  {

  return(
    <>
    
    <Style.Container>
      <h1>Menu</h1> 

        <nav className='Links'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/CadastroCliente">Cadastro de clientes</Link></li>
          </ul>
        </nav>

    </Style.Container>

    </>
  )
}

export default SideBar
