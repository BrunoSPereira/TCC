package services

import (
	"context"
	"fmt"
	"time"

	"strings"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
)

type ClienteService struct{ repo database.ClienteRepo }

func NewClienteService(r database.ClienteRepo) *ClienteService { return &ClienteService{repo: r} }

func (s *ClienteService) Create(ctx context.Context, in models.ClienteCreate) (models.Cliente, error) {
	if strings.TrimSpace(in.CpfCnpj) == "" || strings.TrimSpace(in.RazaoSocial) == "" {
		return models.Cliente{}, ErrDadosInvalidos
	}
	in.CpfCnpj = onlyDigits(in.CpfCnpj)
	in.RgIe = strings.ReplaceAll(in.RgIe, ".", "")
	in.Cep = strings.ReplaceAll(in.Cep, "-", "")

	return s.repo.Create(ctx, in)
}

func (s *ClienteService) GetById(ctx context.Context, id string) (models.Cliente, error) {
	c, err := s.repo.GetById(ctx, id)
	if err != nil {
		return models.Cliente{}, err
	}
	return *c, nil
}

func (s *ClienteService) List(ctx context.Context, limit, offset int) ([]models.Cliente, error) {
	out, err := s.repo.List(ctx, limit, offset)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (s *ClienteService) Update(ctx context.Context, idCliente string, in models.ClienteUpdate) (models.Cliente, error) {
	var c models.Cliente
	c.IdCliente = idCliente

	// campos de pessoas
	if in.RazaoSocial != nil {
		c.RazaoSocial = strings.TrimSpace(*in.RazaoSocial)
	}
	if in.NomeFantasia != nil {
		c.NomeFantasia = strings.TrimSpace(*in.NomeFantasia)
	}
	if in.CpfCnpj != nil {
		v := onlyDigits(*in.CpfCnpj)
		c.CpfCnpj = v
	}
	if in.RgIe != nil {
		c.RgIe = strings.TrimSpace(*in.RgIe)
	}
	if in.DataNascimento != nil {
		if *in.DataNascimento != "" {
			if _, err := time.Parse("2006-01-02", *in.DataNascimento); err != nil {
				return models.Cliente{}, fmt.Errorf("data_nascimento inválida (use YYYY-MM-DD)")
			}
		}
		c.DataNascimento = *in.DataNascimento
	}
	if in.Cep != nil {
		c.Cep = onlyDigits(*in.Cep)
	}
	if in.Logradouro != nil {
		c.Logradouro = strings.TrimSpace(*in.Logradouro)
	}
	if in.Numero != nil {
		c.Numero = strings.TrimSpace(*in.Numero)
	}
	if in.Bairro != nil {
		c.Bairro = strings.TrimSpace(*in.Bairro)
	}
	if in.Cidade != nil {
		c.Cidade = strings.TrimSpace(*in.Cidade)
	}
	if in.Uf != nil {
		uf := strings.ToUpper(strings.TrimSpace(*in.Uf))
		if uf != "" && len(uf) != 2 {
			return models.Cliente{}, fmt.Errorf("uf inválida (use 2 letras)")
		}
		c.Uf = uf
	}
	if in.Telefone != nil {
		c.Telefone = strings.TrimSpace(*in.Telefone)
	}
	if in.Email != nil {
		c.Email = strings.TrimSpace(*in.Email)
	}

	if in.LimiteCredito != nil {
		c.LimiteCredito = strings.TrimSpace(*in.LimiteCredito)
	}
	if in.Observacao != nil {
		c.Observacao = strings.TrimSpace(*in.Observacao)
	}
	if in.FgAtivo != nil {
		c.FgAtivo = strings.TrimSpace(*in.FgAtivo)
	}

	if err := s.repo.Update(ctx, &c); err != nil {
		return models.Cliente{}, err
	}
	return c, nil
}

func (s *ClienteService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
