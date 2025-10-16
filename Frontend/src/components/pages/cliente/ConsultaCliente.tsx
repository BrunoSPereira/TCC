import * as Style from "./Cliente.Styled";
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

  const handleRowClick = (id_cliente: string) => {
    if (id_cliente) navigate(`/CadastroCliente/${id_cliente}`);
  };

  return (
    <>
      <Style.Container>
        <button
          type="button"
          className="Incluir"
          onClick={() => navigate("/CadastroCliente")}
        >
          Incluir
        </button>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Razão social</th>
              <th>Fantasia</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ativo</th>
            </tr>
          </thead>

          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id_cliente}
                onClick={() => handleRowClick(cliente.id_cliente)}
                style={{cursor:"pointer"}}
                >
                  <td>{cliente.id_cliente}</td>
                  <td>{cliente.razao_social}</td>
                  <td>{cliente.nome_fantasia}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.fg_ativo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>Nenhum cliente encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </Style.Container>
    </>
  );
}

export default ConsultaCliente;
