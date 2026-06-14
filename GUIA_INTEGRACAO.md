# Guia de Integração — PetLoveCare

Guia prático para a equipe conectar os apps (web e desktop) à API.
Mantido por **Gabriel** (integração). Dúvidas de "não conecta", "deu CORS", "como rodo a API" → começa por aqui.

- **Repositório:** https://github.com/GabrielGordoMachado/petlovecare
- **API em produção (Railway):** https://petlovecare-api-production.up.railway.app
- **Stack da API:** NestJS 11 + Prisma 7 + PostgreSQL 16

---

## 0. Antes de tudo — clonar o repo

```bash
git clone https://github.com/GabrielGordoMachado/petlovecare.git
cd petlovecare
```

Estrutura do monorepo:

```
petlovecare/
├── api/        → backend NestJS + Prisma (já pronto)
├── web/        → app React (José Vitor) — fluxo do CLIENTE
├── desktop/    → app Electron (Gabriel) — fluxo do ADMIN
└── docker-compose.yml  → Postgres local
```

> **Importante:** ninguém precisa mexer no banco para fazer as telas.
> Web e desktop são **clientes HTTP** da mesma API. Você escolhe se aponta para o
> servidor do Railway (mais simples) ou para uma API rodando na sua máquina (para testar mudanças no backend).

---

## 1. Qual URL usar? (a decisão mais importante)

Existem **dois ambientes**. O frontend só muda **uma linha** (a `baseURL` do axios).

| Ambiente | baseURL | Quando usar |
|---|---|---|
| **Produção (Railway)** | `https://petlovecare-api-production.up.railway.app` | Padrão. Para desenvolver as telas sem subir nada local. |
| **Local** | `http://localhost:3000` | Só se você precisa testar/alterar a própria API. |

**Recomendação:** José Vitor (web) usa **produção** o tempo todo. Gabriel (desktop + backend) sobe a API local quando precisa testar mudanças na própria API.

Para não ter que editar código toda hora, use variável de ambiente (ver seção 4 e 5).

---

## 2. Rodar a API LOCALMENTE (só quem mexe no backend)

Pré-requisitos: **Docker** + **Node 20+**.

### Passo 1 — Subir o banco Postgres
Na raiz do repo:
```bash
docker compose up -d
```
Isso sobe um Postgres 16 em `localhost:5432` (user/senha/db = `petlovecare/senha123/petlovecare`).

### Passo 2 — Configurar o `.env` da API
Crie `api/.env` (não vai pro git):
```env
DATABASE_URL="postgresql://petlovecare:senha123@localhost:5432/petlovecare"
```

### Passo 3 — Instalar e migrar
```bash
cd api
npm install            # roda "prisma generate" automaticamente (postinstall)
npx prisma migrate dev # cria as tabelas no banco local
```

### Passo 4 — Subir a API
```bash
npm run start:dev      # modo watch, recarrega ao salvar
```
API disponível em **http://localhost:3000**.

Teste rápido:
```bash
curl http://localhost:3000/clientes      # deve responder [] (lista vazia)
```

---

## 3. Mapa da API (contrato para o frontend)

Base de todas as rotas abaixo é a `baseURL`. Corpo e resposta em JSON.

### Clientes — `/clientes`
| Método | Rota | Corpo | Uso |
|---|---|---|---|
| POST | `/clientes` | `{ cpf, nome, telefone, email, senha }` | Cadastro |
| GET | `/clientes` | — | Listar |
| GET | `/clientes/:cpf` | — | Buscar (inclui pets) |
| PUT | `/clientes/:cpf` | `{ nome?, telefone?, email?, senha? }` | Editar |
| DELETE | `/clientes/:cpf` | — | Excluir |

### Administradores — `/administradores`
Mesmo CRUD de clientes, trocando o recurso. PK = `cpf`.

### Pets — `/pets`
| Método | Rota | Corpo | Uso |
|---|---|---|---|
| POST | `/pets` | `{ cliente_cpf, nomePet, especie, raca, idade, observacoes? }` | Cadastrar pet |
| GET | `/pets` | — | Listar todos |
| GET | `/pets/cliente/:cpf` | — | Pets de um cliente |
| GET | `/pets/:id` | — | Buscar pet |
| PUT | `/pets/:id` | `{ nomePet?, especie?, raca?, idade?, observacoes? }` | Editar |
| DELETE | `/pets/:id` | — | Excluir |

### Serviços — `/servicos`
| Método | Rota | Corpo | Uso |
|---|---|---|---|
| POST | `/servicos` | `{ admin_cpf, nome, descricao?, preco, duracao }` | Criar (admin) |
| GET | `/servicos` | — | Listar |
| GET | `/servicos/:id` | — | Buscar |
| PUT | `/servicos/:id` | `{ nome?, descricao?, preco?, duracao? }` | Editar |
| DELETE | `/servicos/:id` | — | Excluir |

### Agendamentos — `/agendamentos`
| Método | Rota | Corpo | Uso |
|---|---|---|---|
| POST | `/agendamentos` | `{ cliente_cpf, pet_id, servico_ids:[], data_hora, observacao? }` | Cliente agenda |
| GET | `/agendamentos` | — | Listar todos (admin) |
| GET | `/agendamentos/cliente/:cpf` | — | Agendamentos do cliente |
| GET | `/agendamentos/:id` | — | Buscar |
| PUT | `/agendamentos/:id/status` | `{ status, admin_cpf? }` | Admin aprova/recusa/finaliza |
| DELETE | `/agendamentos/:id` | — | Cancelar (vira status `cancelado`) |

`status` ∈ `agendado | em_andamento | finalizado | cancelado`.
`data_hora` em ISO, ex: `"2026-06-20T14:00:00"`.

### Feedback — `/feedback`
| Método | Rota | Corpo | Uso |
|---|---|---|---|
| POST | `/feedback` | `{ agendamento_id, cliente_cpf, nota, comentario }` | Cliente avalia |
| GET | `/feedback` | — | Listar |
| GET | `/feedback/:id` | — | Buscar |
| PUT | `/feedback/:id/responder` | `{ admin_cpf, resposta }` | Admin responde |
| DELETE | `/feedback/:id` | — | Excluir |

`nota` = 1 a 5. Um feedback por agendamento.

### Regras de negócio (validadas na API, ao criar agendamento)
- **RN01** — entre 1 e 2 serviços por agendamento (`servico_ids`).
- **RN02** — cão acima de 20kg (texto "acima de 20kg" em `observacoes` do pet) + banho/tosa exige 2 serviços.
- **RN03** — não agendar a menos de 1h do fechamento (18h).

Erros vêm como HTTP 400/404/409 com `{ message }`.

---

## 4. App WEB — José Vitor (fluxo do CLIENTE)

### Criar o projeto
Na raiz do repo:
```bash
npm create vite@latest web -- --template react-ts
cd web
npm install
npm install axios react-router-dom
```

### Configurar a conexão com a API
Crie `web/.env`:
```env
VITE_API_URL=https://petlovecare-api-production.up.railway.app
```

Crie `web/src/services/api.ts`:
```ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;

// exemplos de uso
export const clientesService = {
  cadastrar: (data: any) => api.post('/clientes', data),
  login: (cpf: string) => api.get(`/clientes/${cpf}`), // ver nota de auth abaixo
};
export const petsService = {
  doCliente: (cpf: string) => api.get(`/pets/cliente/${cpf}`),
  criar: (data: any) => api.post('/pets', data),
};
export const agendamentosService = {
  criar: (data: any) => api.post('/agendamentos', data),
  doCliente: (cpf: string) => api.get(`/agendamentos/cliente/${cpf}`),
};
export const feedbackService = {
  criar: (data: any) => api.post('/feedback', data),
};
```

### Telas (fluxo do cliente)
- Login / Cadastro
- Gerenciar pets
- Agendar serviço
- Ver agendamentos
- Deixar feedback

### Rodar
```bash
npm run dev   # abre em http://localhost:5173
```

---

## 5. App DESKTOP — Gabriel (fluxo do ADMIN)

### Criar o projeto
> O `desktop/` atual é boilerplate antigo. Há um `services/api.ts` e `types/index.ts`
> reaproveitáveis ao recriar o projeto.

```bash
npm create electron-vite@latest desktop -- --template react-ts
cd desktop
npm install axios
```

### Configurar a conexão
Mesma ideia da web. Em `desktop/src/services/api.ts`:
```ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petlovecare-api-production.up.railway.app',
});
export default api;

export const agendamentosService = {
  listar: () => api.get('/agendamentos'),
  atualizarStatus: (id: number, status: string, admin_cpf: string) =>
    api.put(`/agendamentos/${id}/status`, { status, admin_cpf }),
};
export const servicosService = {
  listar: () => api.get('/servicos'),
  criar: (data: any) => api.post('/servicos', data),
  atualizar: (id: number, data: any) => api.put(`/servicos/${id}`, data),
  excluir: (id: number) => api.delete(`/servicos/${id}`),
};
export const feedbackService = {
  listar: () => api.get('/feedback'),
  responder: (id: number, admin_cpf: string, resposta: string) =>
    api.put(`/feedback/${id}/responder`, { admin_cpf, resposta }),
};
```

### Telas (fluxo do admin)
- Aprovar/recusar agendamentos (`PUT /agendamentos/:id/status`)
- Gerenciar serviços (CRUD `/servicos`)
- Ver feedbacks e responder (`PUT /feedback/:id/responder`)
- Relatórios (a partir de `GET /agendamentos` e `GET /feedback`)

---

## 6. Pendências da API que bloqueiam a integração (responsável: Gabriel)

Status a acompanhar:

- [x] **CORS** — habilitado via `app.enableCors()` no `api/src/main.ts`. Web e desktop já conseguem consumir a API. *(Falta fazer o deploy no Railway para valer em produção.)*
- [x] **Validação de entrada** — `ValidationPipe` global ativo. DTOs criados em `clientes/dto` como padrão; entrada inválida agora retorna `400` com mensagens claras. **Falta replicar DTOs nos demais módulos** (administradores, pets, servicos, agendamentos, feedback) seguindo o mesmo modelo.
- [ ] **Rota de login** — não existe autenticação. As telas de Login (web/desktop) precisam de `POST /auth/login` validando cpf+senha. Por ora dá pra simular buscando por CPF, mas o ideal é a rota.

> ⚠️ As mudanças de CORS/validação já estão no código, mas **só valem em produção após o deploy no Railway**. Até lá, teste contra a API **local** ou peça o deploy ao Gabriel.

---

## 7. Checklist antes da entrega

- [ ] Testar todas as rotas com dados reais (Insomnia/Postman ou as próprias telas)
- [ ] Validar RN01, RN02, RN03 na prática
- [ ] Web cobrindo o fluxo do cliente; Desktop cobrindo o fluxo do admin
- [ ] Diagramas UML (Nahie) + documento de requisitos limpo
- [ ] Apresentação montada
