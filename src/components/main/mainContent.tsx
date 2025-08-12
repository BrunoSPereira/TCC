import { Routes, Route } from "react-router-dom";
import TopBar from "../topbar/topBar";
import * as Style from "./main.Styled";
import Home from "../pages/Home";
import CadastroCliente from "../pages/CadastroCliente";
import CadastroProduto from "../pages/CadastroProdutos";
import CadastroOs from "../pages/CadastroOs";

export const MainContent = () => {
  return (
    <>
      <Style.Container>
        <TopBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
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
