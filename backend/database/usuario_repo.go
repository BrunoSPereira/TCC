package database

import (
	"context"

	"github.com/giogiovana/TCC/models"
)

type UsuarioRepo interface {
	Create(ctx context.Context, u *models.Usuario) error
	GetByLogin(ctx context.Context, login string) (*models.Usuario, error)
	List(ctx context.Context, limit, offset int) ([]models.Usuario, error)
	Update(ctx context.Context, u *models.Usuario) error
	Delete(ctx context.Context, login string) error
}

type UsuarioRepoPG struct{ db *DAO }

func NewUsuarioRepo(db *DAO) *UsuarioRepoPG { return &UsuarioRepoPG{db: db} }

func (r *UsuarioRepoPG) Create(ctx context.Context, u *models.Usuario) error {
	const q = `insert into usuarios (login, senha, nome)
		values ($1, $2, $3)
		returning login, senha, nome`
	return r.db.DB().GetContext(ctx, u, q, u.Login, u.Senha, u.Nome)
}

func (r *UsuarioRepoPG) GetByLogin(ctx context.Context, login string) (*models.Usuario, error) {
	const q = `select login, senha, nome from usuarios where login=$1`
	var u models.Usuario
	if err := r.db.DB().GetContext(ctx, &u, q, login); err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *UsuarioRepoPG) List(ctx context.Context, limit, offset int) ([]models.Usuario, error) {
	if limit <= 0 {
		limit = 50
	}
	const q = `select login, senha, nome from usuarios order by login limit $1 offset $2`
	var out []models.Usuario
	if err := r.db.DB().SelectContext(ctx, &out, q, limit, offset); err != nil {
		return nil, err
	}
	return out, nil
}

func (r *UsuarioRepoPG) Update(ctx context.Context, u *models.Usuario) error {
	const q = `
	update usuarios set
	senha = coalesce($2, senha),
	nome = coalesce($3, nome)
	where login = $1
	returning login, senha, nome`
	return r.db.DB().GetContext(ctx, u, q, u.Login, nullIfEmpty(u.Senha), nullIfEmpty(u.Nome))
}

func (r *UsuarioRepoPG) Delete(ctx context.Context, login string) error {
	_, err := r.db.DB().ExecContext(ctx, `delete from usuarios where login=$1`, login)
	return err
}

// helpers
func nullIfEmpty(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}
