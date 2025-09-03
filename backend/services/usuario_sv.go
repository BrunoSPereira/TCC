package services

import (
	"context"
	"errors"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
	"golang.org/x/crypto/bcrypt"
)

type UsuarioService struct{ repo database.UsuarioRepo }

func NewUsuarioService(r database.UsuarioRepo) *UsuarioService { return &UsuarioService{repo: r} }

func (s *UsuarioService) Create(ctx context.Context, in models.UsuarioCreate) (models.Usuario, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(in.Senha), bcrypt.DefaultCost)
	if err != nil {
		return models.Usuario{}, err
	}
	u := models.Usuario{Login: in.Login, Nome: in.Nome, Senha: string(hash)}
	if err := s.repo.Create(ctx, &u); err != nil {
		return models.Usuario{}, err
	}
	// nunca retorne a senha
	u.Senha = ""
	return u, nil
}

func (s *UsuarioService) GetByLogin(ctx context.Context, login string) (models.Usuario, error) {
	u, err := s.repo.GetByLogin(ctx, login)
	if err != nil {
		return models.Usuario{}, err
	}
	u.Senha = ""
	return *u, nil
}

func (s *UsuarioService) List(ctx context.Context, limit, offset int) ([]models.Usuario, error) {
	out, err := s.repo.List(ctx, limit, offset)
	if err != nil {
		return nil, err
	}
	for i := range out {
		out[i].Senha = ""
	}
	return out, nil
}

func (s *UsuarioService) Update(ctx context.Context, login string, in models.UsuarioUpdate) (models.Usuario, error) {
	var u models.Usuario
	u.Login = login
	if in.Nome != nil {
		u.Nome = *in.Nome
	}
	if in.Senha != nil && *in.Senha != "" {
		hash, err := bcrypt.GenerateFromPassword([]byte(*in.Senha), bcrypt.DefaultCost)
		if err != nil {
			return models.Usuario{}, err
		}
		u.Senha = string(hash)
	}
	if err := s.repo.Update(ctx, &u); err != nil {
		return models.Usuario{}, err
	}
	u.Senha = ""
	return u, nil
}

func (s *UsuarioService) Delete(ctx context.Context, login string) error {
	return s.repo.Delete(ctx, login)
}

var ErrInvalidCredentials = errors.New("credenciais inválidas")

func (s *UsuarioService) Authenticate(ctx context.Context, login, senha string) (models.Usuario, error) {
	u, err := s.repo.GetByLogin(ctx, login)
	if err != nil {
		return models.Usuario{}, err
	}
	if bcrypt.CompareHashAndPassword([]byte(u.Senha), []byte(senha)) != nil {
		return models.Usuario{}, ErrInvalidCredentials
	}
	u.Senha = ""
	return *u, nil
}
