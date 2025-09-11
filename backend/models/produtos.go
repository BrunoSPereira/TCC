package models

type ProdutoCreate struct {
	IdProduto  string `json:"id_produto"`
	Marca      string `json:"marca"`
	Modelo     string `json:"modelo"`
	Tipo       string `json:"tipo"`
	Descricao  string `json:"descricao"`
	Categoria  string `json:"categoria"`
	Observacao string `json:"observacao"`
}

type Produto struct {
	IdProduto  string `db:"id_produto" json:"id_produto"`
	Marca      string `db:"marca" json:"marca"`
	Modelo     string `db:"modelo" json:"modelo"`
	Tipo       string `db:"tipo" json:"tipo"`
	Descricao  string `db:"descricao" json:"descricao"`
	Categoria  string `db:"categoria" json:"categoria"`
	Observacao string `db:"observacao" json:"observacao"`
}

type ProdutoUpdate struct {
	IdProduto  *string `json:"id_produto,omitempty"`
	Marca      *string `json:"marca,omitempty"`
	Modelo     *string `json:"modelo,omitempty"`
	Tipo       *string `json:"tipo,omitempty"`
	Descricao  *string `json:"descricao,omitempty"`
	Categoria  *string `json:"categoria,omitempty"`
	Observacao *string `json:"observacao,omitempty"`
}
