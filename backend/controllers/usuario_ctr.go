package controllers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/giogiovana/TCC/models"
	"github.com/giogiovana/TCC/services"

	"github.com/go-chi/chi/v5"
	"github.com/lib/pq"
)

type UsuarioController struct{ svc *services.UsuarioService }

func NewUsuarioController(s *services.UsuarioService) *UsuarioController {
	return &UsuarioController{svc: s}
}

func (c *UsuarioController) Register(r chi.Router) {
	r.Route("/usuarios", func(r chi.Router) {
		r.Post("/", c.create)
		r.Get("/", c.list)
		r.Get("/{login}", c.get)
		r.Put("/{login}", c.update)
		r.Delete("/{login}", c.delete)
	})
}

func (c *UsuarioController) create(w http.ResponseWriter, r *http.Request) {
	var in models.UsuarioCreate
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		respondErr(w, 400, "json inválido")
		return
	}
	if in.Login == "" || in.Nome == "" || in.Senha == "" {
		respondErr(w, 400, "login, nome e senha são obrigatórios")
		return
	}
	u, err := c.svc.Create(r.Context(), in)
	if err != nil {
		if isUniqueViolation(err) {
			respondErr(w, 409, "login já existe")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, 201, u)
}

func (c *UsuarioController) get(w http.ResponseWriter, r *http.Request) {
	login := chi.URLParam(r, "login")
	u, err := c.svc.GetByLogin(r.Context(), login)
	if err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, 200, u)
}

func (c *UsuarioController) list(w http.ResponseWriter, r *http.Request) {
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
	items, err := c.svc.List(r.Context(), limit, offset)
	if err != nil {
		respondErr(w, 500, err.Error())
		return
	}
	respond(w, 200, items)
}

func (c *UsuarioController) update(w http.ResponseWriter, r *http.Request) {
	login := chi.URLParam(r, "login")
	var in models.UsuarioUpdate
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		respondErr(w, 400, "json inválido")
		return
	}
	_, err := c.svc.Update(r.Context(), login, in)
	if err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}
}
func (c *UsuarioController) delete(w http.ResponseWriter, r *http.Request) {
	login := chi.URLParam(r, "login")
	if err := c.svc.Delete(r.Context(), login); err != nil {
		if err == sql.ErrNoRows {
			respondErr(w, 404, "não encontrado")
			return
		}
		respondErr(w, 500, err.Error())
		return
	}
	w.WriteHeader(204)
}

// helpers
func respond(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
func respondErr(w http.ResponseWriter, status int, msg string) {
	type e struct {
		Error string `json:"error"`
	}
	respond(w, status, e{Error: msg})
}
func isUniqueViolation(err error) bool {
	if pgerr, ok := err.(*pq.Error); ok {
		return string(pgerr.Code) == "23505"
	}
	return false
}
