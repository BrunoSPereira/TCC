package database

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/giogiovana/TCC/models"
	"github.com/lib/pq"
)

type TecnicoRepo interface {
	Create(ctx context.Context, in models.TecnicoCreate) (models.Tecnico, error)
	GetById(ctx context.Context, id string) (*models.Tecnico, error)
	List(ctx context.Context, limit, offset int) ([]models.Tecnico, error)
	Update(ctx context.Context, in *models.Tecnico) error
	Delete(ctx context.Context, id string) (err error)
}

type TecnicoRepoPG struct{ db *DAO }

var ErrUsuarioFKInexistente = errors.New("usuario inexistente")

func NewTecnicoRepo(db *DAO) *TecnicoRepoPG { return &TecnicoRepoPG{db: db} }

func (r *TecnicoRepoPG) Create(ctx context.Context, in models.TecnicoCreate) (models.Tecnico, error) {
	tx, err := r.db.DB().BeginTxx(ctx, &sql.TxOptions{Isolation: sql.LevelReadCommitted})
	if err != nil {
		return models.Tecnico{}, err
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
			return models.Tecnico{}, err
		}
		dn = &t
	}

	var da *time.Time
	if in.DataAdmissao != "" {
		t, e := time.Parse("2006-01-02", in.DataAdmissao)
		if e != nil {
			err = e
			return models.Tecnico{}, err
		}
		da = &t
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
		return models.Tecnico{}, err
	}

	const qTecnico = `
		INSERT INTO tecnicos (id_pessoa, usuario, especialidade, data_admissao, fg_ativo)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id_tecnico 
	`
	var IdTecnico string
	if err = tx.QueryRowContext(ctx, qTecnico, idPessoa, in.Usuario, in.Especialidade, da, in.FgAtivo).Scan(&IdTecnico); err != nil {
		if pgerr, ok := err.(*pq.Error); ok && string(pgerr.Code) == "23503" {
			return models.Tecnico{}, ErrUsuarioFKInexistente
		}
		return models.Tecnico{}, err
	}

	if err = tx.Commit(); err != nil {
		return models.Tecnico{}, err
	}

	out := models.Tecnico{
		IdTecnico:      IdTecnico,
		RazaoSocial:    in.RazaoSocial,
		NomeFantasia:   in.NomeFantasia,
		CpfCnpj:        in.CpfCnpj,
		RgIe:           in.RgIe,
		FgTipo:         in.FgTipo,
		DataNascimento: in.DataNascimento,
		Cep:            in.Cep,
		Logradouro:     in.Logradouro,
		Numero:         in.Numero,
		Bairro:         in.Bairro,
		Cidade:         in.Cidade,
		Uf:             in.Uf,
		Telefone:       in.Telefone,
		Email:          in.Email,
		Usuario:        in.Usuario,
		Especialidade:  in.Especialidade,
		DataAdmissao:   in.DataAdmissao,
		FgAtivo:        in.FgAtivo,
	}
	return out, nil
}

func (r *TecnicoRepoPG) GetById(ctx context.Context, id string) (*models.Tecnico, error) {
	const q = `
	select te.id_tecnico, pe.razao_social, pe.nome_fantasia, pe.cpf_cnpj,
	pe.rg_ie, pe.fg_tipo, pe.data_nascimento, pe.cep, pe.logradouro, pe.numero,
	pe.bairro, pe.cidade, pe.uf, pe.telefone, pe.email, te.usuario, te.especialidade,
	te.data_admissao, te.fg_ativo
	from tecnicos te inner join pessoas pe on pe.id_pessoa = te.id_pessoa
	where te.id_tecnico = $1
	`
	var t models.Tecnico
	if err := r.db.DB().MustBegin().GetContext(ctx, &t, q, id); err != nil {
		return nil, err
	}
	return &t, nil
}

func (r *TecnicoRepoPG) List(ctx context.Context, limit, offset int) ([]models.Tecnico, error) {
	if limit <= 0 {
		limit = 50
	}
	const q = `
	select te.id_tecnico, pe.razao_social, pe.nome_fantasia, pe.cpf_cnpj,
	pe.rg_ie, pe.fg_tipo, pe.data_nascimento, pe.cep, pe.logradouro, pe.numero,
	pe.bairro, pe.cidade, pe.uf, pe.telefone, pe.email, te.usuario, te.especialidade,
	te.data_admissao, te.fg_ativo
	from tecnicos te inner join pessoas pe on pe.id_pessoa = te.id_pessoa
	order by te.id_tecnico LIMIT $1 OFFSET $2`

	var out []models.Tecnico
	if err := r.db.DB().SelectContext(ctx, &out, q, limit, offset); err != nil {
		return nil, err
	}
	return out, nil
}

func (r *TecnicoRepoPG) Update(ctx context.Context, in *models.Tecnico) error {
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
	const qTecnico = `
	UPDATE tecnicos SET
		usuario = coalesce(nullif($2, ''), usuario),
		especialidade = coalesce(nullif($3, ''), especialidade),
		data_admissao = coalesce(nullif($4, '')::date, data_admissao),
		fg_ativo = coalesce(nullif($5, ''), fg_ativo)
	WHERE id_tecnico = $1
	RETURNING id_pessoa
	`
	if err := tx.QueryRowContext(ctx, qTecnico, in.IdTecnico, nullIfEmpty(in.Usuario), nullIfEmpty(in.Especialidade), nullIfEmpty(in.DataAdmissao), nullIfEmpty(in.FgAtivo)).Scan(&idPessoa); err != nil {
		if pgerr, ok := err.(*pq.Error); ok && string(pgerr.Code) == "23503" {
			return err.(*pq.Error)
		}
		return err
	}

	const qPessoa = `
	UPDATE pessoas SET
		cpf_cnpj       = COALESCE(NULLIF($2,''),        cpf_cnpj),
		rg_ie          = COALESCE(NULLIF($3,''),        rg_ie),
		fg_tipo        = COALESCE(NULLIF($4, ''),       fg_tipo),
		razao_social   = COALESCE(NULLIF($5,''),        razao_social),
		nome_fantasia  = COALESCE(NULLIF($6,''),        nome_fantasia),
		data_nascimento= COALESCE(NULLIF($7,'')::date,  data_nascimento),
		email          = COALESCE(NULLIF($8,''),        email),
		telefone       = COALESCE(NULLIF($9,''),        telefone),
		cep            = COALESCE(NULLIF($10,''),        cep),
		logradouro     = COALESCE(NULLIF($11,''),       logradouro),
		numero         = COALESCE(NULLIF($12,''),       numero),
		bairro         = COALESCE(NULLIF($13,''),       bairro),
		cidade         = COALESCE(NULLIF($14,''),       cidade),
		uf             = COALESCE(NULLIF($15,''),       uf)
	WHERE id_pessoa = $1
	`

	if _, err = tx.ExecContext(ctx, qPessoa,
		idPessoa, in.CpfCnpj, in.RgIe, in.RazaoSocial, in.FgTipo, in.NomeFantasia, in.DataNascimento,
		in.Email, in.Telefone, in.Cep, in.Logradouro, in.Numero, in.Bairro, in.Cidade, in.Uf,
	); err != nil {
		return err
	}

	return tx.Commit()
}

func (r *TecnicoRepoPG) Delete(ctx context.Context, id string) (err error) {
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
		`DELETE FROM tecnicos WHERE id_tecnico = $1 RETURNING id_pessoa`, id,
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
