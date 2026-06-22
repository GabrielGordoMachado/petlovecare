# PetLoveCare

#### Disciplina: APSOO — Análise e Projeto de Sistemas Orientados a Objetos
#### Professor: Rodrigo Funabashi Jorge
#### Participantes: Gabriel Gordo Machado, Sérgio, Nahie, José

> Projeto acadêmico de gestão para um pet shop, com **API** (NestJS) consumida por um
> **app web** (tutores) e um **app desktop** (administradores).

## Links

| Recurso | URL |
|---|---|
| Repositório | https://github.com/GabrielGordoMachado/petlovecare |
| App web (produção) | https://petlovecare-5561e.web.app |
| API (produção) | https://petlovecare-api-production.up.railway.app |

## Informações sobre o trabalho

Este repositório implementa o sistema **PetLoveCare**, que consiste em:
- Organizar o atendimento de um pet shop (clientes, pets, serviços e agendamentos).
- Oferecer uma vitrine pública e área do tutor (web) e um painel administrativo (desktop).
- Centralizar as regras de negócio em uma única API REST.

### Escopo funcional
- Cadastro e autenticação de clientes (tutores) e administradores.
- Cadastro e gestão de pets vinculados ao tutor.
- Catálogo de serviços (banho, tosa, consulta, etc.).
- Agendamento de serviços com controle de status (`agendado`, `em_andamento`, `finalizado`, `cancelado`).
- Avaliações (feedback) por agendamento, com resposta do administrador.
- Painel administrativo (desktop) para gerir serviços, agendamentos e feedbacks.

### Regras de negócio (destaques)
- Máximo de **2 serviços por agendamento** (RN01, validada na API).
- **1 feedback por agendamento** (relação 1:1).
- Transições de status restritas ao enum válido (DTO rejeita valores fora do contrato com `400`).
- Cliente é identificado por **CPF** (chave primária); a API exige 11 dígitos sem máscara.

## Arquitetura

```
┌──────────────┐        ┌──────────────┐
│   Web (SPA)  │        │ Desktop (app)│
│ React + Vite │        │   Electron   │
│  tutores     │        │   admin      │
└──────┬───────┘        └──────┬───────┘
       │  HTTP + JSON (Axios)  │
       └───────────┬───────────┘
                   ▼
          ┌──────────────────┐
          │  API — NestJS    │
          │  Prisma ORM      │
          └────────┬─────────┘
                   ▼
            ┌──────────────┐
            │ PostgreSQL   │
            └──────────────┘
```

## Stack

**API** (`api/`)
- **NestJS 11** sobre **Express**, em **TypeScript**
- **Prisma 7.8** (ORM) + **PostgreSQL** (driver `@prisma/adapter-pg` + `pg`)
- Validação com **class-validator / class-transformer** (`ValidationPipe` global)
- Testes: **Jest** + **Supertest**
- Hospedagem: **Railway** (deploy a partir do GitHub; `prisma migrate deploy` no boot)

**Web** (`web/`)
- **React 18** + **React Router 7** + **Vite 5** (TypeScript)
- **Axios** para a API; testes com **Vitest** + Testing Library
- Hospedagem: **Firebase Hosting** (`npm run deploy`)

**Desktop** (`desktop/`)
- **Electron 30** + **electron-builder** (app instalável)
- **React 18** + **Vite** (via `vite-plugin-electron`), **electron-store** para config local

Detalhamento completo em **[api/TECNOLOGIAS.md](api/TECNOLOGIAS.md)**.

## Modelo de dados (Prisma)

Entidades principais (`api/prisma/schema.prisma`):
`Cliente`, `Administrador`, `Pet`, `Servico`, `Agendamento`,
`AgendamentoServico` (junção N:M), `Feedback`; enum `StatusAgendamento`.

## Como executar localmente

Pré-requisitos: **Node.js 20+**, **PostgreSQL**, e **JDK**/Docker conforme o módulo.
O guia completo de "subir tudo" (banco → API → clientes) está em **[RUNBOOK.md](RUNBOOK.md)**.
Integração entre os apps e a API em **[GUIA_INTEGRACAO.md](GUIA_INTEGRACAO.md)**.

```bash
# API (porta 3000) — precisa de DATABASE_URL no api/.env
cd api && npm install && npm run start:dev

# Web (porta 5173) — VITE_API_URL no web/.env (default: API de produção)
cd web && npm install && npm run dev

# Desktop (Electron)
cd desktop && npm install && npm run dev
```

### Publicar o web (Firebase Hosting)
```bash
cd web
npx firebase login        # primeira vez
npm run deploy            # build + firebase deploy --only hosting
```
Passo a passo detalhado em **[web/DEPLOY_FIREBASE.md](web/DEPLOY_FIREBASE.md)**.

## Contribuindo neste repositório
#### Este repositório organiza suas branches por GitHub Flow.
Para isso, seguiremos os seguintes conceitos:
- A branch `main` protegida representa a configuração revisada e aprovada;
- Trabalhe apenas sob premissa e demanda de Issues — crie issues que representem o que deve ser desenvolvido antes de começar. Uma boa issue consiste em:
   - Título claro e conciso. Por exemplo: `Feature request - Nova funcionalidade`
   - Descrição clara com contexto, problema e mudanças (ou novidades) necessárias bem estabelecidos.
   - Caso se trate de reportar um defeito, descreva os passos de como reproduzí-lo.
   - Carga de trabalho baixa.
- Para trabalhar em algo novo, crie uma branch com nome descritivo, por exemplo: `feature/novo-modulo`;
- Comprometa-se com essa ramificação localmente e envie regularmente seu trabalho para a origem;
- Evite conflitos: não altere linhas de código fora do seu escopo; ao encontrar um problema, abra uma Issue ou comunique ao grupo;
- Quando a ramificação estiver pronta, abra um pull request pedindo a outro participante que revise seu trabalho;
- Aprovada a revisão, a branch é mesclada ao destino e excluída.

#### Siga uma semântica de commits adequada.
Padrão da equipe: `Tipo (módulo) - Descrição`. Por exemplo:

`Feat (módulo)` - Introduzir nova funcionalidade
`Fix (módulo)` - Corrigir um defeito
`Docs (documento)` - Atualização de documentação
`Test (módulo)` - Adicionar ou corrigir testes automatizados
`Perf (módulo)` - Alterações de melhoria de performance
`Style (módulo)` - Alterações de formatação/estrutura que não impactam na lógica
`Comments (módulo)` - Adicionar ou atualizar comentários
`Cleanup (módulo)` - Limpeza do código fonte (ex.: remover código morto)
`Removal (módulo)` - Remover arquivos ou código obsoleto
`Work in Progress (módulo)` - Trabalho em andamento
`Chore (módulo)` - Mudanças arquiteturais
`Revert (commit)` - Reverter mudanças de um commit
`Merge (Origem & Destino)` - Mesclar branches

> Observação: **não adicionar coautoria** (sem trailer `Co-Authored-By`) nas mensagens de commit.

## Entregáveis
- Código-fonte da **API**, do **web** e do **desktop**.
- Testes automatizados (unitários e integração) na API.
- Documentação: este README, `TECNOLOGIAS.md`, `RUNBOOK.md`, `GUIA_INTEGRACAO.md`.
- Aplicações publicadas: web (Firebase) e API (Railway).
