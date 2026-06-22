# Backend PetLoveCare — Apresentação Técnica

> API REST que atende o front **web** (React/Vite) e o app **desktop** (Electron, cliente admin).
> Stack: **NestJS + Prisma + PostgreSQL**, hospedada no **Railway** com deploy a partir do **GitHub**.

---

## 1. Arquitetura

- **NestJS 11** sobre **Express** (`@nestjs/platform-express`), em **TypeScript 5.7**.
- Organização em **módulos de domínio**, cada um com seu `controller` (rotas), `service` (regras) e `*.spec.ts` (testes):
  - `clientes`, `administradores`, `pets`, `servicos`, `agendamentos`, `feedback`, `auth`
  - `prisma` como módulo **compartilhado** (acesso ao banco via injeção de dependência).
- Fluxo de uma requisição:

  ```
  Cliente (web/desktop)
        │  HTTP + JSON
        ▼
  Controller  →  ValidationPipe (DTO)  →  Service (regra de negócio)  →  PrismaService  →  PostgreSQL
  ```

- `src/main.ts`: cria a app, habilita **CORS** (libera web em `localhost:5173` e o desktop) e registra o **`ValidationPipe` global**. Sobe em `process.env.PORT || 3000`.

---

## 2. Schema (Prisma)

- Fonte única de verdade em **`prisma/schema.prisma`**: define modelos, relações e o enum de status.
- O **Prisma Client** é gerado a partir do schema (`prisma generate`) e dá acesso tipado ao banco.
- Mudanças de modelo viram **migrations versionadas** em `prisma/migrations/` (init: `20260601204755_init`).

**Entidades:**

- **Cliente** (`cpf` PK) — nome, telefone, email (único), senha.
- **Administrador** (`cpf` PK) — mesmos campos.
- **Pet** (`id` PK) — pertence a um Cliente; espécie, raça, idade, observações.
- **Servico** (`id` PK) — criado por um Administrador; `preco Decimal(10,2)`, `duracao` (min).
- **Agendamento** (`id` PK) — liga Cliente, Pet e (opcional) Administrador; `data_hora`, `status`, `observacao`.
- **AgendamentoServico** — junção **N:M** Agendamento↔Serviço (PK composta). Regra **RN01: máx. 2 serviços por agendamento**.
- **Feedback** (`id` PK) — **1:1 com Agendamento** (`agendamento_id @unique`); `nota` (1–5), `comentario`, `data`, `resposta`.

**Enum `StatusAgendamento`:** `agendado`, `em_andamento`, `finalizado`, `cancelado`.

**Relacionamentos:**

```
Cliente 1───N Pet            Administrador 1───N Servico
Cliente 1───N Agendamento    Administrador 1───N Agendamento
Cliente 1───N Feedback       Administrador 1───N Feedback
Pet     1───N Agendamento
Agendamento N───N Servico   (via AgendamentoServico)
Agendamento 1───1 Feedback
```

---

## 3. Banco de dados

- **PostgreSQL** (`provider = "postgresql"`).
- **ORM: Prisma 7.8** com **driver adapter** `@prisma/adapter-pg` + **`pg` 8** (conexão Postgres nativa).
- Conexão centralizada em `src/prisma/prisma.service.ts`:

  ```ts
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  super({ adapter });
  ```

- `PrismaService` é um provider injetável que conecta no boot (`onModuleInit`) e é reutilizado por todos os serviços.

---

## 4. Autenticação

- `auth.service.ts` valida **CPF + senha**, distinguindo **cliente** e **administrador**.
- Mensagem de erro **genérica** ("CPF ou senha inválidos") — não revela qual campo falhou.
- Em caso de sucesso, retorna os dados do usuário (`cpf`, `nome`, `email`, `tipo`); o **controle de sessão fica no front** (não há JWT/sessão no servidor ainda).
- ⚠️ **Senhas em texto puro** atualmente — há um `TODO` explícito para aplicar **hash com bcrypt** na criação e comparar no login. Recomendado antes de produção.

---

## 5. Validador da API

- **`ValidationPipe` global** em `main.ts`, configurado com:
  - `whitelist` — remove campos que não estão no DTO;
  - `forbidNonWhitelisted` — rejeita requisições com campos desconhecidos;
  - `transform` — converte tipos automaticamente (ex.: `"5"` → `5`).
- Regras declaradas nos **DTOs** com **`class-validator`** + **`class-transformer`**
  (ex.: `clientes/dto/criar-cliente.dto.ts`, `agendamentos/dto/atualizar-status.dto.ts`).
- Resultado: cada endpoint só recebe dados já **validados e tipados**, sem checagem manual nos controllers.

---

## 6. Deploy

- **Plataforma: [Railway](https://railway.app/)**, com deploy **a partir do GitHub** — a cada push, o Railway puxa o repositório, builda e sobe a API.
- **PostgreSQL gerenciado no próprio Railway**; o `DATABASE_URL` de produção é **injetado como variável de ambiente** (não fica no repositório).
- No deploy, o script `start` executa **`prisma migrate deploy`** antes de subir, aplicando o schema no banco do Railway automaticamente.
- `postinstall` roda `prisma generate` para gerar o client durante o build.
- O `.env` local (`localhost:5432`) vale **apenas em desenvolvimento**; em produção, prevalece o `DATABASE_URL` do Railway.

**Variáveis de ambiente:**

| Variável | Onde | Papel |
|---|---|---|
| `DATABASE_URL` | Railway (prod) / `.env` (dev) | Conexão com o PostgreSQL |
| `PORT` | Railway (prod) | Porta da API (fallback `3000`) |

---

## 7. Aplicações clientes (web e desktop)

Dois frontends consomem a mesma API via **Axios**, ambos em **React 18 + React Router 7 + TypeScript + Vite**.

### Web (`web/` — `petlovecare-web`)

- **React 18 + React Router 7**, build com **Vite 5**, em **TypeScript**.
- **Axios** para falar com a API.
- Testes: **Vitest** + **Testing Library** (`@testing-library/react`, `user-event`, `jest-dom`) + **jsdom**.
- Qualidade: **ESLint 9 + Prettier**.
- **Deploy: Firebase Hosting** — script `deploy` roda `vite build` e `firebase deploy --only hosting` (via `firebase-tools`).
- Público-alvo: **tutores** (vitrine, agendamento, conta).

### Desktop (`desktop/` — cliente admin)

- **Electron 30** empacotado com **electron-builder 24** (`electron-builder.json5`).
- Interface também em **React 18 + React Router 7 + Vite**, integrada via **vite-plugin-electron** / `vite-plugin-electron-renderer`.
- Processos Electron: **main** (`electron/main.ts`) e **preload** (`electron/preload.ts`); entrada empacotada em `dist-electron/main.js`.
- **Axios** para a API e **`electron-store`** para persistência local de configurações.
- **Distribuição:** `build` roda `tsc && vite build && electron-builder`, gerando o **app instalável** (não é "hospedado" como o web — é distribuído como executável).
- Público-alvo: **administradores** (serviços, agendamentos, feedbacks).

### Onde cada parte roda

| Aplicação | Stack | Onde fica |
|---|---|---|
| **API** | NestJS + Prisma + PostgreSQL | **Railway** (deploy via GitHub) |
| **Web** | React + Vite | **Firebase Hosting** |
| **Desktop** | Electron + React + Vite | **App instalável** (electron-builder) |

## Stack — resumo

| Camada | Tecnologia |
|---|---|
| Framework | NestJS 11 + Express |
| Linguagem | TypeScript 5.7 |
| ORM | Prisma 7.8 (`@prisma/adapter-pg` + `pg`) |
| Banco | PostgreSQL |
| Validação | class-validator / class-transformer |
| Config | @nestjs/config + dotenv |
| Testes | Jest 30 + Supertest |
| Qualidade | ESLint 9 + Prettier |
| Deploy | Railway (via GitHub) |
