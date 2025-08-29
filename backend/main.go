package main

import (
	"fmt"
	"log"

	"github.com/giogiovana/TCC/config"
	"github.com/giogiovana/TCC/database"
	"github.com/giogiovana/TCC/services"

	_ "github.com/lib/pq"
)

func main() {
	cfg, err := config.New()

	if err != nil {
		log.Fatalf("error: %v\n", err)
	}

	db, err := database.New(cfg)

	if err != nil {
		log.Fatalf("error: %v\n", err)
	}

	defer db.Closer()

	fmt.Println("Conexão DB com Sucesso!")

	service := services.New(cfg.ApiConfig, db)

	service.Listen()

}
