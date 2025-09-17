package services

import (
	"context"
	"strings"

	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/models"
)

type ProdutoService struct{ repo database.ProdutoRepo }

func NewProdutoService(r database.ProdutoRepo) *ProdutoService { return &ProdutoService{repo: r} }

func (s *ProdutoService) Create(ctx context.Context, in models.ProdutoCreate) (models.Produto, error) {
	return s.repo.Create(ctx, in)
}

func (s *ProdutoService) GetById(ctx context.Context, id string) (models.Produto, error) {
	out, err := s.repo.GetById(ctx, id)
	if err != nil {
		return models.Produto{}, err
	}
	return *out, nil
}

func (s *ProdutoService) List(ctx context.Context, limit, offset int) ([]models.Produto, error) {
	out, err := s.repo.List(ctx, limit, offset)

	if err != nil {
		return nil, err
	}
	return out, nil
}

func (s *ProdutoService) Update(ctx context.Context, idProduto string, in models.ProdutoUpdate) (models.Produto, error) {
	var p models.Produto
	p.IdProduto = idProduto

	if in.Marca != nil {
		p.Marca = strings.TrimSpace(*in.Marca)
	}

	if in.Modelo != nil {
		p.Modelo = strings.TrimSpace(*in.Modelo)
	}

	if in.Tipo != nil {
		p.Tipo = strings.TrimSpace(*in.Tipo)
	}

	if in.Descricao != nil {
		p.Descricao = strings.TrimSpace(*in.Descricao)
	}

	if in.Categoria != nil {
		p.Categoria = strings.TrimSpace(*in.Categoria)
	}

	if in.Observacao != nil {
		p.Observacao = strings.TrimSpace(*in.Observacao)
	}

	if err := s.repo.Update(ctx, &p); err != nil {
		return models.Produto{}, err
	}

	return p, nil
}

func (s *ProdutoService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}
