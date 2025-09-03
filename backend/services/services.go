package services

import (
	"fmt"
	"log"

	"github.com/giogiovana/TCC/config"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

type Services struct {
	cfg *config.Config
}

func New(cfg *config.Config) *Services {
	return &Services{cfg: cfg}
}

func (s *Services) StartMigrations() {
	db, err := s.cfg.DBConfig.ConnectDB()
	if err != nil {
		return
	}
	defer db.Close()

	driver, err := postgres.WithInstance(db.DB, &postgres.Config{})
	if err != nil {
		log.Println(err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file:./migrations",
		"postgres", driver)

	if err != nil {
		log.Fatalln(err)
	}

	err = m.Up()
	versaoMigration, fg_dirty, _ := m.Version()

	if err != nil {
		if err.Error() != "no change" {
			log.Fatalf("Erro ao executar os migrations: %v", err)
		} else if err.Error() == "no change" {
			fmt.Print("MIGRATIONS STATUS:\tSEM ATUALIZAÇÕES DISPONÍVEIS\n")
			fmt.Printf("VERSÃO MIGRATIONS:\t%d\n", versaoMigration)
			fmt.Printf("MIGRATIONS DIRTY:\t%t\n", fg_dirty)
		}
	} else {
		fmt.Print("MIGRATIONS STATUS:\tATUALIZADO\n")
		fmt.Printf("VERSÃO MIGRATIONS:\t%d\n", versaoMigration)
		fmt.Printf("MIGRATIONS DIRTY:\t%t\n", fg_dirty)
	}
}
