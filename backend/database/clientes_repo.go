package database

import (
	"context"
	"database/sql"
	"time"

	"github.com/giogiovana/TCC/models"
)

type ClienteRepo interface {
	Create(ctx context.Context, in models.ClienteCreate) (models.Cliente, error)
	GetById(ctx context.Context, id string) (*models.Cliente, error)
	List(ctx context.Context, limit, offset int) ([]models.Cliente, error)
	Update(ctx context.Context, c *models.Cliente) error
	Delete(ctx context.Context, id string) error
}

type ClienteRepoPG struct{ db *DAO }

func NewClienteRepo(db *DAO) *ClienteRepoPG { return &ClienteRepoPG{db: db} }

func (r *ClienteRepoPG) Create(ctx context.Context, in models.ClienteCreate) (models.Cliente, error) {
	tx, err := r.db.DB().BeginTxx(ctx, &sql.TxOptions{Isolation: sql.LevelReadCommitted})
	if err != nil {
		return models.Cliente{}, err
	}
	defer func() {
		if err != nil {
			_ = tx.Rollback()
		}
	}()

	var dn *time.Time
	if in.DataNascimento != "" {
		t, e := time.Parse("2006-01-02", in.DataNascimento)
		if e != nil {
			err = e
			return models.Cliente{}, err
		}
		dn = &t
	}

	const qPessoa = `
        INSERT INTO pessoas
            (cpf_cnpj, rg_ie, fg_tipo, razao_social, nome_fantasia, data_nascimento,
             email, telefone, cep, logradouro, numero, bairro, cidade, uf)
        VALUES
            ($1,$2,$3,$4,$5,$6,
             $7,$8,$9,$10,$11,$12,$13,$14)
        RETURNING id_pessoa
    `
	var idPessoa int64
	if err = tx.QueryRowContext(ctx, qPessoa,
		in.CpfCnpj, in.RgIe, in.FgTipo, in.RazaoSocial, in.NomeFantasia, dn,
		in.Email, in.Telefone, in.Cep, in.Logradouro, in.Numero, in.Bairro, in.Cidade, in.Uf,
	).Scan(&idPessoa); err != nil {
		return models.Cliente{}, err
	}
	const qCliente = `
        INSERT INTO clientes (id_pessoa, limite_credito, observacao, fg_ativo)
        VALUES ($1,$2,$3,$4)
		RETURNING id_cliente
    `
	var IdCliente string
	if err = tx.QueryRowContext(ctx, qCliente,
		idPessoa, in.LimiteCredito, in.Observacao, in.FgAtivo,
	).Scan(&IdCliente); err != nil {
		return models.Cliente{}, err
	}

	if err = tx.Commit(); err != nil {
		return models.Cliente{}, err
	}

	out := models.Cliente{
		IdCliente:     IdCliente,
		CpfCnpj:       in.CpfCnpj,
		RazaoSocial:   in.RazaoSocial,
		NomeFantasia:  in.NomeFantasia,
		Email:         in.Email,
		Telefone:      in.Telefone,
		LimiteCredito: in.LimiteCredito,
		Observacao:    in.Observacao,
		FgAtivo:       in.FgAtivo,
	}
	return out, nil
}

func (r *ClienteRepoPG) GetById(ctx context.Context, id string) (*models.Cliente, error) {
	const q = `
	select cl.id_cliente, pe.razao_social, pe.nome_fantasia, pe.cpf_cnpj,
	pe.rg_ie, pe.data_nascimento, pe.cep, pe.logradouro, pe.numero,
	pe.bairro, pe.cidade, pe.uf, pe.telefone, pe.email, cl.limite_credito,
	cl.observacao, cl.fg_ativo
	from clientes cl inner join pessoas pe on pe.id_pessoa = cl.id_pessoa
	where cl.id_cliente = $1`

	var c models.Cliente
	if err := r.db.DB().GetContext(ctx, &c, q, id); err != nil {
		return nil, err
	}
	return &c, nil
}

func (r *ClienteRepoPG) List(ctx context.Context, limit, offset int) ([]models.Cliente, error) {
	if limit <= 0 {
		limit = 50
	}
	const q = `
	select cl.id_cliente, pe.razao_social, pe.nome_fantasia, pe.cpf_cnpj,
	pe.rg_ie, pe.data_nascimento, pe.cep, pe.logradouro, pe.numero,
	pe.bairro, pe.cidade, pe.uf, pe.telefone, pe.email, cl.limite_credito,
	cl.observacao, cl.fg_ativo
	from clientes cl inner join pessoas pe on pe.id_pessoa = cl.id_pessoa
	order by cl.id_cliente LIMIT $1 OFFSET $2`

	var out []models.Cliente
	if err := r.db.DB().SelectContext(ctx, &out, q, limit, offset); err != nil {
		return nil, err
	}
	return out, nil

}

func (r *ClienteRepoPG) Update(ctx context.Context, in *models.Cliente) error {
	tx, err := r.db.DB().BeginTxx(ctx, &sql.TxOptions{Isolation: sql.LevelReadCommitted})
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			_ = tx.Rollback()
		}
	}()

	var idPessoa int64
	const qCliente = `update clientes set
	limite_credito = coalesce($2, limite_credito), 
	observacao = coalesce($3, observacao), 
	fg_ativo = coalesce($4, fg_ativo)
	where id_cliente = $1 returning id_pessoa
	`
	if err := tx.QueryRowContext(ctx, qCliente, in.IdCliente, nullIfEmpty(in.LimiteCredito), nullIfEmpty(in.Observacao), nullIfEmpty(in.FgAtivo)).Scan(&idPessoa); err != nil {
		return err
	}

	const qPessoa = `update pessoas set
	cpf_cnpj = coalesce($2, cpf_cnpj), rg_ie = coalesce($3, rg_ie), fg_tipo = coalesce($4, fg_tipo), 
	razao_social = coalesce($5, razao_social), nome_fantasia = coalesce($6, nome_fantasia), data_nascimento = coalesce($7, data_nascimento),
    email = coalesce($8, email), telefone = coalesce($9, telefone), cep = coalesce($10, cep), logradouro = coalesce($11, logradouro), 
	numero = coalesce($12, numero), bairro = coalesce($13, bairro), cidade = coalesce($14, cidade), uf = coalesce($15, uf)
	where id_pessoa = $1`

	if _, err = tx.ExecContext(ctx, qPessoa,
		idPessoa,
		in.CpfCnpj, in.RgIe, in.RazaoSocial, in.NomeFantasia, in.DataNascimento,
		in.Email, in.Telefone, in.Cep, in.Logradouro, in.Numero, in.Bairro, in.Cidade, in.Uf,
	); err != nil {
		return err
	}

	return tx.Commit()
}

func (r *ClienteRepoPG) Delete(ctx context.Context, id string) (err error) {
	tx, err := r.db.DB().BeginTxx(ctx, &sql.TxOptions{Isolation: sql.LevelReadCommitted})
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			_ = tx.Rollback()
		}
	}()

	var idPessoa int64
	if err = tx.QueryRowContext(ctx,
		`DELETE FROM clientes WHERE id_cliente = $1 RETURNING id_pessoa`, id,
	).Scan(&idPessoa); err != nil {
		return err
	}

	if _, err = tx.ExecContext(ctx,
		`DELETE FROM pessoas WHERE id_pessoa = $1`, idPessoa,
	); err != nil {
		return err
	}

	return tx.Commit()
}
