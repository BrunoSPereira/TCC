import { Routes, Route } from "react-router-dom";
import * as Style from "./main.Styled";
import Home from "../pages/Home";
import CadastroCliente from "../pages/cliente/CadastroCliente";
import ConsultaCliente from "../pages/cliente/ConsultaCliente";
import CadastroProduto from "../pages/CadastroProdutos";
import CadastroOs from "../pages/CadastroOs";

export const MainContent = () => {
  return (
    <>
      <Style.Container>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ConsultaCliente" element={<ConsultaCliente />} />
            <Route path="/CadastroCliente" element={<CadastroCliente />} />
            <Route path="/CadastroProduto" element={<CadastroProduto />} />
            <Route path="/CadastroOs" element={<CadastroOs />} />
          </Routes>
        </div>
      </Style.Container>
    </>
  );
};

export default MainContent;
