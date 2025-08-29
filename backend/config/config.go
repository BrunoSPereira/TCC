package config

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/jmoiron/sqlx/reflectx"
	"github.com/joho/godotenv"
	"github.com/pkg/errors"
)

type DBConfig struct {
	User   string
	Pass   string
	Host   string
	Port   string
	DBName string
}

type ApiConfig struct {
	Port string
}

type Config struct {
	DBConfig  *DBConfig
	ApiConfig *ApiConfig
}

func New() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, errors.Wrap(err, "não pode carregar as váriaveis de conexão")
	}

	return &Config{
		DBConfig: &DBConfig{
			User:   os.Getenv("DB_USER"),
			Pass:   os.Getenv("DB_PASS"),
			Host:   os.Getenv("DB_HOST"),
			Port:   os.Getenv("DB_PORT"),
			DBName: os.Getenv("DB_NAME"),
		},
		ApiConfig: &ApiConfig{
			Port: os.Getenv("API_PORT"),
		},
	}, nil
}

func (d *DBConfig) ConnectDB() (*sqlx.DB, error) {
	conStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", d.Host, d.Port, d.User, d.Pass, d.DBName)

	// Abre uma conexao com o banco de dados
	db, err := sqlx.Open("postgres", conStr)
	if err != nil {
		return nil, fmt.Errorf("erro ao abrir conexão com o banco: %w", err)
	}

	// Pinga no banco para verificar se a conexao esta estavel
	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("erro ao pingar no banco no banco %s: %w", d.Host, err)
	}

	db.Mapper = reflectx.NewMapperTagFunc("db", nil, strings.ToLower)

	db.SetMaxIdleConns(5)
	db.SetMaxOpenConns(10)
	db.SetConnMaxLifetime(10 * time.Minute)

	return db, nil
}
