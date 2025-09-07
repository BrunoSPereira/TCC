# ---- Build stage ----
FROM golang:1.25-alpine AS builder

ENV GOPRIVATE="github.com"

RUN apk add --no-cache git

WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download

# copie o resto do projeto
COPY . .

ARG APP_VERSION

# Para Postgres não precisamos de CGO nem de bibliotecas nativas
# (assumindo driver puro Go, ex.: jackc/pgx ou lib/pq)
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
  go build -ldflags "-s -w -X main.versionTag=$APP_VERSION -X main.buildDate=$(date +%Y-%m-%dT%H:%M:%S)" \
  -o /root/api-os .

# ---- Final stage ----
FROM alpine:3.20

RUN apk --no-cache add ca-certificates tzdata

ENV TZ=America/Sao_Paulo

WORKDIR /app
COPY --from=builder /root/api-os .
ADD migrations /app/migrations

# ajuste se sua API expõe outra porta
EXPOSE 8080

CMD ["./api-os"]