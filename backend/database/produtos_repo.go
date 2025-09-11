package database

import (
	"context"

	"github.com/giogiovana/TCC/models"
)

type ProdutoRepo interface {
	Create(ctx context.Context, in models.ProdutoCreate) (models.Cliente, error)
	GetById(ctx context.Context, id string) (*models.Produto, error)
	List(ctx context.Context, limit, offset int) ([]models.Produto, error)
	Update(ctx context.Context, c *models.Produto) error
	Delete(ctx context.Context, id string) error
}

type ProdutoRepoPG struct{ db *DAO }

func NewProdutoRepo(db *DAO) *ProdutoRepoPG { return &ProdutoRepoPG{db: db} }
