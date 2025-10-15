package services

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
)

type TecnicoService struct{ repo database.TecnicoRepo }

func NewTecnicoService(r database.TecnicoRepo) *TecnicoService { return &TecnicoService{repo: r} }

func (s *TecnicoService) Create(ctx context.Context, in models.TecnicoCreate) (models.Tecnico, error) {
	if strings.TrimSpace(in.CpfCnpj) == "" || strings.TrimSpace(in.RazaoSocial) == "" {
		return models.Tecnico{}, ErrDadosInvalidos
	}

	in.CpfCnpj = onlyDigits(in.CpfCnpj)
	in.RgIe = strings.ReplaceAll(in.RgIe, ".", "")
	in.Cep = strings.ReplaceAll(in.Cep, "-", "")

	return s.repo.Create(ctx, in)
}

func (s *TecnicoService) GetById(ctx context.Context, id string) (models.Tecnico, error) {
	c, err := s.repo.GetById(ctx, id)
	if err != nil {
		return models.Tecnico{}, err
	}
	return *c, nil
}

func (s *TecnicoService) List(ctx context.Context, limit, offset int) ([]models.Tecnico, error) {
	out, err := s.repo.List(ctx, limit, offset)
	if err != nil {
		return nil, err
	}
	return out, nil
}
func (s *TecnicoService) Update(ctx context.Context, idTecnico string, in models.TecnicoUpdate) (models.Tecnico, error) {
	var t models.Tecnico
	t.IdTecnico = idTecnico

	// campos de pessoas
	if in.RazaoSocial != nil {
		t.RazaoSocial = strings.TrimSpace(*in.RazaoSocial)
	}
	if in.NomeFantasia != nil {
		t.NomeFantasia = strings.TrimSpace(*in.NomeFantasia)
	}
	if in.CpfCnpj != nil {
		v := onlyDigits(*in.CpfCnpj)
		t.CpfCnpj = v
	}
	if in.RgIe != nil {
		t.RgIe = strings.TrimSpace(*in.RgIe)
	}
	if in.Cep != nil {
		t.Cep = onlyDigits(*in.Cep)
	}
	if in.Logradouro != nil {
		t.Logradouro = strings.TrimSpace(*in.Logradouro)
	}
	if in.Numero != nil {
		t.Numero = strings.TrimSpace(*in.Numero)
	}
	if in.Bairro != nil {
		t.Bairro = strings.TrimSpace(*in.Bairro)
	}
	if in.Cidade != nil {
		t.Cidade = strings.TrimSpace(*in.Cidade)
	}
	if in.Uf != nil {
		uf := strings.ToUpper(strings.TrimSpace(*in.Uf))
		if uf != "" && len(uf) != 2 {
			return models.Tecnico{}, fmt.Errorf("uf inválida (use 2 letras)")
		}
		t.Uf = uf
	}
	if in.Telefone != nil {
		t.Telefone = strings.TrimSpace(*in.Telefone)
	}
	if in.Email != nil {
		t.Email = strings.TrimSpace(*in.Email)
	}

	if in.Usuario != nil {
		t.Usuario = strings.TrimSpace(*in.Usuario)
	}

	if in.Especialidade != nil {
		t.Especialidade = strings.TrimSpace(*in.Especialidade)
	}

	if in.FgAtivo != nil {
		t.FgAtivo = strings.TrimSpace(*in.FgAtivo)
	}

	if err := s.repo.Update(ctx, &t); err != nil {
		if errors.Is(err, database.ErrUsuarioFKInexistente) {
			return models.Tecnico{}, database.ErrUsuarioFKInexistente
		}
		return models.Tecnico{}, err
	}

	return t, nil
}

func (s *TecnicoService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
