import * as Style from "./CadastroCliente.Styled";
import { consultarCliente } from "./Cliente.Function";
import { useEffect, useState } from "react";
import { Cliente } from "../../../Models/cliente";
import { useNavigate } from "react-router-dom";

export function ConsultaCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarClientes() {
      const data = await consultarCliente();
      setClientes(data);
    }
    carregarClientes();
  }, []);

  return (
    <>
      <Style.Container>
        <button
          type="button"
          className="Salvar"
          onClick={() => navigate("/CadastroCliente")}
        >
          Incluir
        </button>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ativo</th>
            </tr>
          </thead>

          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id_cliente}>
                  <td>{cliente.id_cliente}</td>
                  <td>{cliente.razao_social}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.fg_ativo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
            )}
          </tbody>
        </table>
      </Style.Container>
    </>
  );
}

export default ConsultaCliente;
