import axios from "axios";
import api from "Frontend\src\api.ts"

export async function Log(
  cpf_cnpj: string,
  razao_social: string,
  email: string,
  telefone: string,
  cep: string,
  logradouro: string,
  numero: string,
  bairro: string,
  cidade: string,
  uf: string,
): Promise<boolean> {

  try {
    const cliente = await axios.post(
      "http://localhost:8080/clientes",
      {
        cpf_cnpj,
        razao_social,
        email,
        telefone,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        uf,
      },
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${api}` } },
    );

    return cliente.data;

  } catch (error) {
    console.error("Erro no cadastro de clientes:", error);
    return false;
  }
}
