package models

type Usuario struct {
	Login string `db:"login" json:"login"`
	Senha string `db:"senha" json:"-"`
	Nome  string `db:"nome" json:"nome"`
}

type UsuarioCreate struct {
	Login string `json:"login"`
	Nome  string `json:"nome"`
	Senha string `json:"senha"`
}

type UsuarioUpdate struct {
	Nome  *string `json:"nome"`
	Senha *string `json:"senha"`
}
