import { Routes, Route } from "react-router-dom";
import * as Style from "../../Styles/main.Styled";

import CadastroCliente from "../pages/Cliente/CadastroCliente";
import ConsultaCliente from "../pages/Cliente/ConsultaCliente";

import CadastroProduto from "../pages/Produto/CadastroProdutos";
import ConsultaProduto from "../pages/Produto/ConsultaProduto";

import CadastroTecnico from "../pages/Tecnicos/CadastroTecnico";
import ConsultaTecnico from "../pages/Tecnicos/ConsultaTecnico";

import ConsultaOs from "../pages/OrdemServico/ConsultaOs";
import CadastroOs from "../pages/OrdemServico/CadastroOs";

import CadastroServico from "../pages/Servico/CadastroServico";
import ConsultaServico from "../pages/Servico/ConsultaServico";

export const MainContent = () => {
  return (
    <>
      <Style.Container>
        <div className="content">
          <Routes>
            <Route path="/ConsultaCliente" element={<ConsultaCliente />} />
            <Route
              path="/CadastroCliente/:id_cliente?"
              element={<CadastroCliente />}
            />

            <Route path="/ConsultaProduto" element={<ConsultaProduto />} />
            <Route
              path="/CadastroProduto/:id_produto?"
              element={<CadastroProduto />}
            />

            <Route path="/ConsultaTecnico" element={<ConsultaTecnico />} />
            <Route
              path="/CadastroTecnico/:id_tecnico?"
              element={<CadastroTecnico />}
            />

            <Route path="/ConsultaOs" element={<ConsultaOs />} />
            <Route path="/CadastroOs/:id_os?" element={<CadastroOs />} />

            <Route path="/ConsultaServico" element={<ConsultaServico />} />
            <Route
              path="/CadastroServico/:id_servico?"
              element={<CadastroServico />}
            />
          </Routes>
        </div>
      </Style.Container>
    </>
  );
};

export default MainContent;
