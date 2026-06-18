# Runbook — Rodar o PetLoveCare do zero

Guia passo a passo para subir o projeto **após reiniciar a máquina**.
A ordem importa: **1) Banco → 2) API → 3) Desktop**.

> Caminho do projeto: `/home/gabriel/PetShop`
> São **3 terminais** abertos ao mesmo tempo (um para a API, um para o desktop; o banco roda em background no Docker).

---

## Pré-requisitos (já instalados nesta máquina)

| Ferramenta | Versão confirmada | Checar com |
|---|---|---|
| Docker + Compose | 29.x / 2.40 | `docker --version` |
| Node.js | 22.x | `node --version` |
| npm | 10.x | `npm --version` |

Se algum comando falhar, confira a seção **Solução de problemas** no fim.

---

## 1. Banco de dados (PostgreSQL no Docker)

O Postgres roda em container, definido no `docker-compose.yml` (porta **5432**, usuário/senha/db = `petlovecare`/`senha123`/`petlovecare`).

Após reiniciar, o Docker Desktop/daemon pode não ter subido o container. Na **raiz do projeto**:

```bash
cd /home/gabriel/PetShop
docker compose up -d
```

Confirme que está de pé:

```bash
docker compose ps
```

Deve aparecer o serviço `db` com status `running` e a porta `5432` mapeada.
Os dados ficam persistidos no volume `pgdata` — **reiniciar a máquina não apaga o banco**.

---

## 2. API (NestJS + Prisma) — porta 3000

Em um **terminal novo**:

```bash
cd /home/gabriel/PetShop/api
npm install              # só na 1ª vez ou após mudar dependências
npm start
```

O que `npm start` faz (script do `package.json`):
1. `prisma migrate deploy` — aplica as migrations no banco (idempotente, pode rodar sempre).
2. `nest start` — sobe a API.

Pré-condições:
- O arquivo `api/.env` deve existir com:
  ```
  DATABASE_URL="postgresql://petlovecare:senha123@localhost:5432/petlovecare"
  ```
- O banco do passo 1 precisa estar de pé (senão o `migrate deploy` falha na conexão).

**Sucesso:** no console aparece `API rodando na porta 3000`.
Deixe esse terminal aberto (a API fica em foreground).

Teste rápido em outro terminal:
```bash
curl http://localhost:3000
```

---

## 3. Desktop (Electron + React + Vite)

Em **outro terminal novo**:

```bash
cd /home/gabriel/PetShop/desktop
npm install              # só na 1ª vez ou após mudar dependências
npm run dev
```

O `npm run dev` roda o Vite, e o `vite-plugin-electron` **abre a janela do Electron automaticamente** — não precisa de comando separado.

Pré-condição:
- O arquivo `desktop/.env` deve apontar para a API local:
  ```
  VITE_API_URL=http://localhost:3000
  ```
  > Sem esse `.env`, o app usa a API de **produção** (Railway), não o seu backend local.

**Sucesso:** abre a janela do app desktop (admin). Login/telas funcionam consumindo a API local.

---

## Resumo (TL;DR)

```bash
# Terminal 1 — banco (background)
cd /home/gabriel/PetShop && docker compose up -d

# Terminal 2 — API
cd /home/gabriel/PetShop/api && npm start

# Terminal 3 — Desktop
cd /home/gabriel/PetShop/desktop && npm run dev
```

Ordem obrigatória: banco → API → desktop.

---

## Encerrar tudo

```bash
# Para a API e o desktop: Ctrl+C em cada terminal

# Para o banco (opcional — pode deixar rodando):
cd /home/gabriel/PetShop && docker compose stop
```

Use `docker compose down` apenas para remover o container (o volume `pgdata` e os dados permanecem). **Não** use `docker compose down -v` a não ser que queira **apagar o banco**.

---

## Solução de problemas

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| API: erro `Can't reach database server at localhost:5432` | Banco não subiu | Rode o passo 1 e confira `docker compose ps` |
| API: `port 3000 already in use` | API já rodando ou processo preso | `lsof -i :3000` e mate o PID, ou feche o terminal antigo |
| Desktop conecta na API errada (produção) | Falta `desktop/.env` | Crie `desktop/.env` com `VITE_API_URL=http://localhost:3000` e reinicie o `npm run dev` |
| `docker compose` falha logo após reiniciar | Daemon do Docker ainda iniciando | Aguarde alguns segundos / abra o Docker Desktop e tente de novo |
| Migrations não aplicadas | `migrate deploy` não rodou | `cd api && npx prisma migrate deploy` |
| Erros estranhos após `git pull` | Dependências desatualizadas | Rode `npm install` em `api/` e `desktop/` |

---

## Portas usadas

| Serviço | Porta |
|---|---|
| PostgreSQL | 5432 |
| API (NestJS) | 3000 |
| Vite (dev server do desktop) | 5173 |
