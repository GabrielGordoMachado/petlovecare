# CONFIG — Ferramentas e Tecnologias do Projeto

Documento de referência das ferramentas utilizadas no **PetLoveCare**.
Projeto acadêmico (disciplina APSOO) — um backend único consumido por dois clientes (web e desktop).

---

## Visão geral

| Camada | Tecnologia principal | Papel |
|---|---|---|
| **Backend (API)** | NestJS + Prisma + PostgreSQL | Regras de negócio e acesso ao banco |
| **App Web** | React + Vite | Interface do **cliente** |
| **App Desktop** | Electron + React + Vite | Interface do **administrador** |
| **Banco de dados** | PostgreSQL 16 | Persistência |
| **Infra** | Docker + Railway | Banco local e hospedagem da API |

---

## Backend — API (`/api`)

| Ferramenta | Versão | Para que serve |
|---|---|---|
| **NestJS** | 11 | Framework Node.js para construir a API (módulos, controllers, services) |
| **TypeScript** | 5.7 | Linguagem (JavaScript com tipagem) |
| **Prisma** | 7 | ORM — modela o banco e gera o cliente de acesso |
| **@prisma/adapter-pg** | 7 | Adaptador que conecta o Prisma ao PostgreSQL |
| **pg** | 8 | Driver de conexão com o PostgreSQL |
| **PostgreSQL** | 16 | Banco de dados relacional |
| **class-validator** | — | Valida os dados de entrada (DTOs) |
| **class-transformer** | — | Converte o JSON recebido em instâncias dos DTOs |
| **dotenv** | 17 | Carrega variáveis de ambiente do `.env` |
| **reflect-metadata** | 0.2 | Suporte aos decorators do NestJS |
| **rxjs** | 7 | Programação reativa (usado internamente pelo Nest) |

**Ferramentas de desenvolvimento (API):**

| Ferramenta | Para que serve |
|---|---|
| **@nestjs/cli** | Comandos do Nest (`nest build`, `nest start`) |
| **Jest** + **ts-jest** | Testes automatizados |
| **Supertest** | Testes de integração das rotas HTTP |
| **ESLint** | Análise estática / padronização do código |
| **Prettier** | Formatação automática do código |

---

## App Web (`/web`) — fluxo do cliente

| Ferramenta | Versão | Para que serve |
|---|---|---|
| **React** | 18 | Biblioteca de interface (componentes) |
| **Vite** | 5 | Bundler e servidor de desenvolvimento (build rápido + HMR) |
| **TypeScript** | 5 | Linguagem |
| **axios** | 1 | Cliente HTTP para chamar a API |
| **react-router-dom** | 7 | Navegação entre telas (rotas) |

---

## App Desktop (`/desktop`) — fluxo do administrador

| Ferramenta | Versão | Para que serve |
|---|---|---|
| **Electron** | 30 | Empacota a aplicação web como app de desktop |
| **React** | 18 | Biblioteca de interface |
| **Vite** | 5 | Bundler e servidor de desenvolvimento |
| **vite-plugin-electron** | — | Integra o Vite ao processo do Electron |
| **electron-builder** | 24 | Gera os instaladores (Windows/Linux/macOS) |
| **TypeScript** | 5 | Linguagem |
| **axios** | 1 | Cliente HTTP para chamar a API |

---

## Banco de dados e Infraestrutura

| Ferramenta | Para que serve |
|---|---|
| **PostgreSQL 16** | Banco de dados relacional |
| **Docker / Docker Compose** | Sobe o PostgreSQL local em container (`docker-compose.yml`) |
| **Railway** | Hospedagem da API em produção (deploy na nuvem) |
| **Prisma Migrate** | Versiona e aplica as mudanças no esquema do banco |

---

## Controle de versão

| Ferramenta | Para que serve |
|---|---|
| **Git** | Versionamento do código |
| **GitHub** | Repositório remoto: https://github.com/GabrielGordoMachado/petlovecare |

---

## Resumo das linguagens

- **TypeScript** — toda a aplicação (API, web e desktop)
- **SQL** — gerado pelo Prisma nas migrations
- **Markdown** — documentação (este arquivo, `GUIA_INTEGRACAO.md`, READMEs)
