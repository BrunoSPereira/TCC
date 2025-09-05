import * as Style from "./sideBar.Styled";
import UserTag from "./UserTag";
import { NavLink } from "react-router-dom";
import { MdHome, MdPerson, MdInventory2, MdBuild } from "react-icons/md";

type SideBarProps = {
  onLogout: () => void;
};

export const SideBar = ({ onLogout }: SideBarProps) => {

  return (
    <Style.Container>
      <div className="card-menu">
        <UserTag onLogout={onLogout} />
        <nav className="Links">
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <MdHome className="icon" /> Home
              </NavLink>
            </li>

            <li className="section-title">Cadastros</li>

            <li>
              <NavLink
                to="/CadastroCliente"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <MdPerson className="icon" /> Clientes
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/CadastroProduto"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <MdInventory2 className="icon" /> Produtos
              </NavLink>
            </li>

            <li className="section-title">Gerenciamento</li>

            <li>
              <NavLink
                to="/CadastroOs"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <MdBuild className="icon" /> Ordens de serviço
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="logo">
        <img src="src/assets/Logo.png" alt="Logo" />
        <p className="p">TCC foda da Gio e do Bruno 0.0.1</p>
      </div>
    </Style.Container>
  );
};

export default SideBar;
