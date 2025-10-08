import api from "../../../api";
import { Cliente } from "../../../Models/cliente";

export async function cadastrarCliente(cliente: Cliente): Promise<boolean> {
  try {
    const response = await api.post("/clientes", cliente);
    return response.status === 201;
  } catch (error) {
    console.error("Erro no cadastro de clientes:", error);
    return false;
  }
}

export async function consultarCliente(): Promise<any> {
  try {
    const response = await api.get("/clientes");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro na consulta de clientes:", error);
    return false;
  }
}
