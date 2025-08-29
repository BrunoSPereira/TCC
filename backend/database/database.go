package database

import (
	"time"

	"github.com/giogiovana/TCC/config"
	"github.com/jmoiron/sqlx"
)

type DAO struct {
	dao *sqlx.DB
}

func New(cfg *config.Config) (*DAO, error) {
	dao, err := cfg.DBConfig.ConnectDB()

	if err != nil {
		return nil, err
	}

	dao.SetMaxIdleConns(5)
	dao.SetMaxOpenConns(10)
	dao.SetConnMaxLifetime(10 * time.Minute)

	return &DAO{
		dao: dao,
	}, nil
}

func (d *DAO) Closer() error {
	if err := d.dao.Close(); err != nil {
		return err
	}

	return nil
}

func (d *DAO) DB() *sqlx.DB {
	return d.dao
}
