import axios from "axios";

export async function Log(cpf_cnpj: string, razao_social: string, email:string, telefone:string, cep:string, logradouro:string, numero:string, bairro:string, cidade:string, uf:string ): Promise<boolean> {
  try {
    const credenciais = await axios.post(
      "http://localhost:8080/clientes",
      { cpf_cnpj, razao_social, email, telefone, cep, logradouro, numero, bairro, cidade, uf },
      { headers: { "Content-Type": "application/json" } },
    );

    return false;
  } catch (error) {
    console.error("Erro no cadastro de clientes:", error);
    return false;
  }
}