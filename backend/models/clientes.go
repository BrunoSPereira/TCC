package models

type ClienteCreate struct {
	CpfCnpj      string `json:"cpf_cnpj"`
	RgIe         string `json:"rg_ie"`
	FgTipo       string `json:"fg_tipo"`
	RazaoSocial  string `json:"razao_social"`
	NomeFantasia string `json:"nome_fantasia"`
	Email        string `json:"email"`
	Telefone     string `json:"telefone"`
	Cep          string `json:"cep"`
	Logradouro   string `json:"logradouro"`
	Numero       string `json:"numero"`
	Bairro       string `json:"bairro"`
	Cidade       string `json:"cidade"`
	Uf           string `json:"uf"`

	LimiteCredito string `json:"limite_credito"`
	Observacao    string `json:"observacao"`
	FgAtivo       string `json:"fg_ativo"`
}

type Cliente struct {
	IdCliente     string `db:"id_cliente" json:"id_cliente"`
	RazaoSocial   string `db:"razao_social" json:"razao_social"`
	NomeFantasia  string `db:"nome_fantasia" json:"nome_fantasia"`
	CpfCnpj       string `db:"cpf_cnpj" json:"cpf_cnpj"`
	RgIe          string `db:"rg_ie" json:"rg_ie"`
	FgTipo        string `db:"fg_tipo" json:"fg_tipo"`
	Cep           string `db:"cep" json:"cep"`
	Logradouro    string `db:"logradouro" json:"logradouro"`
	Numero        string `db:"numero" json:"numero"`
	Bairro        string `db:"bairro" json:"bairro"`
	Cidade        string `db:"cidade" json:"cidade"`
	Uf            string `db:"uf" json:"uf"`
	Telefone      string `db:"telefone" json:"telefone"`
	Email         string `db:"email" json:"email"`
	LimiteCredito string `db:"limite_credito" json:"limite_credito"`
	Observacao    string `db:"observacao" json:"observacao"`
	FgAtivo       string `db:"fg_ativo" json:"fg_ativo"`
}

type ClienteUpdate struct {
	RazaoSocial  *string `json:"razao_social,omitempty"`
	NomeFantasia *string `json:"nome_fantasia,omitempty"`
	CpfCnpj      *string `json:"cpf_cnpj,omitempty"`
	RgIe         *string `json:"rg_ie,omitempty"`
	FgTipo       *string `json:"fg_tipo,omitempty"`
	Cep          *string `json:"cep,omitempty"`
	Logradouro   *string `json:"logradouro,omitempty"`
	Numero       *string `json:"numero,omitempty"`
	Bairro       *string `json:"bairro,omitempty"`
	Cidade       *string `json:"cidade,omitempty"`
	Uf           *string `json:"uf,omitempty"`
	Telefone     *string `json:"telefone,omitempty"`
	Email        *string `json:"email,omitempty"`

	LimiteCredito *string `json:"limite_credito,omitempty"`
	Observacao    *string `json:"observacao,omitempty"`
	FgAtivo       *string `json:"fg_ativo,omitempty"`
}
