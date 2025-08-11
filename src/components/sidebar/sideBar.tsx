import * as Style from './sideBar.Styled'
import { NavLink } from "react-router-dom";

import { MdHome } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { BsTools } from "react-icons/bs";

export const SideBar = () =>  {

  return(
    <>
    
    <Style.Container>
    
    <nav className='Links'>
      <ul>
        <li>
          <NavLink 
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")} >
            <MdHome className="icons" /> Home
          </NavLink>
        </li>     

        <p>Cadastros</p>

        <li>
          <NavLink to="/CadastroCliente"
          className={({ isActive }) => (isActive ? "active" : "")} >
            <MdPerson className="icons" /> Clientes
          </NavLink>
        </li>

        <li>
          <NavLink to="/CadastroProduto"
          className={({ isActive }) => (isActive ? "active" : "")} >
            <FaBox className="icons" /> Produtos
          </NavLink>
        </li>

        <p>Gerenciamento</p>

        <li>
          <NavLink to="/Cadastros"
          className={({ isActive }) => (isActive ? "active" : "")} >
            <BsTools className="icons" /> Ordens de serviço
          </NavLink>
        </li>

      </ul>
    </nav>

    </Style.Container>

    </>
  )
}

export default SideBar
