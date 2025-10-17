export type Cliente = {
  id_cliente: string;
  razao_social: string;
  nome_fantasia: string;
  cpf_cnpj: string;
  rg_ie: string;
  fg_tipo: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  telefone: string;
  email: string;
  limite_credito: string;
  observacao: string;
  fg_ativo: "S" | "N";
};

export const clienteVazio: Cliente = {
  id_cliente: "",
  razao_social: "",
  nome_fantasia: "",
  cpf_cnpj: "",
  rg_ie: "",
  cep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
  telefone: "",
  email: "",
  limite_credito: "",
  observacao: "",
  fg_ativo: "S",
  fg_tipo: "F",
};
